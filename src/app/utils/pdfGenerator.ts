import jspdf from 'jspdf';
import { CookieData, loadFromLocalStorage } from './LocalStorageManager';

export function generatePDF() {
    const data: CookieData = loadFromLocalStorage();
    const doc = new jspdf();

    // Construção do título
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(14);
    doc.text("Confissão", 105, 10, { align: 'center' });

    doc.setFont('Roboto', 'normal');
    doc.setFontSize(12);

    // Construção do texto
    let yPosition = 30;
    Object.keys(data).forEach((questionnaireNumber) => {
        const questions = data[Number(questionnaireNumber)];
        doc.text(`Mandamento ${questionnaireNumber}`, 10, yPosition);
        yPosition += 10;

        Object.keys(questions).forEach((questionNumber) => {
            const options = questions[Number(questionNumber)];
            doc.text(`Pergunta ${questionNumber}`, 15, yPosition);
            yPosition += 10;

            options.forEach((option) => {
                doc.text(`- ${option}`, 20, yPosition);
                yPosition += 10;

                if (yPosition > 280) {
                    doc.addPage();
                    yPosition = 10;
                }
            });
        });
    });

    doc.save('myconfession.pdf');
}
