import { generatePDF } from "../utils/pdfGenerator";

export default function PdfButton() {
return (
    <div className="text-center mt-8">
        <button
            onClick={generatePDF}
            className="px-4 py-2 bg-roman-red text-white rounded-lg shadow-md hover:bg-red-700"
        >
            Gerar PDF da Confissão
        </button>
    </div>
);

}