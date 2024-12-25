import jsPDF from 'jspdf';
import { fetchAndUpdateCommandments } from '../services/commandmentsService';

export async function generatePDF() {
    const commandments = await fetchAndUpdateCommandments(); 
    const doc = new jsPDF();

    doc.setFont('Roboto', 'bold');
    doc.setFontSize(14);
    doc.text("Confissão", 105, 10, { align: 'center' });

    doc.setFont('Times New Roman', 'normal');
    doc.setFontSize(12);

    let yPosition = 30;

    commandments.forEach((commandment) => {
        const { questionnaireTitle, questions, questionnaireSubtitle } = commandment;

        doc.setFont('Roboto', 'bold');
        doc.text(`${questionnaireTitle}`, 10, yPosition);
        yPosition += 10;

        
        if (questionnaireSubtitle) {
            doc.setFont('Roboto', 'semibold');
            doc.text(`${questionnaireSubtitle}`, 10, yPosition);
            yPosition += 10;
        }

        doc.setFont('Times New Roman', 'normal');
      

        questions.forEach((question) => {
            const { questionTitle, options } = question;

            doc.text(`${questionTitle}`, 15, yPosition);
            yPosition += 10;

            options
                .filter((option) => option.checked)
                .forEach((option) => {
                    doc.text(`- ${option.optionPhrase}`, 20, yPosition);
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