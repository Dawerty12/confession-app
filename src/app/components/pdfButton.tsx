import { generatePDF } from "../utils/pdfGenerator";

export default function PdfButton() {
return (
    <div className="w-full flex items-center justify-center">
        <button
            onClick={generatePDF}
            className="px-4 py-2 h-14 bg-brand-500 text-white rounded-lg shadow-md hover:bg-brand-700 w-2/4"
        >
            Baixar
        </button>
    </div>
);

}