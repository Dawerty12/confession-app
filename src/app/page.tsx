import Image from "next/image";
import Link from "next/link";
import Guadalupe from '@/assets/Guadalupe.svg';
import Navbar from "./components/navBar";

export default function Home() {
  return (
    <main className="w-full">
        <Navbar />
      <div id="container" className="m-7 flex flex-col items-center">
        <div id="guadalupe" className="mt-10">
          <Image src={Guadalupe} alt="Guadalupe Mary" width={350} />
        </div>

        <div id="title" className="mt-5 font-katibeh text-center">
          <h1 className="text-6xl text-brand-500 leading-10">Não sabe o que 
            <br /><span className="text-brand-900">confessar?</span>
            <br /><span className="text-brand-500 text-5xl">Nós te ajudamos</span>
            </h1>
        </div>
        <div id="body-text" className="p-4 text-center mt-5">
            <p className="text-brand-900 font-roboto font-normal text-xl">
            Este aplicativo foi desenvolvido para auxiliar os fiéis na preparação para o sacramento da confissão. As perguntas são cuidadosamente elaboradas com base nos mandamentos e nas orientações da Igreja.
            </p>
        </div>
        <div id="next-button" className="mt-5 bg-brand-500 h-16 w-80 rounded-xl flex items-center justify-center cursor-pointer">
          <Link href="/commandments" className="w-full h-full flex items-center justify-center text-white">
            Montar confissão
          </Link>
        </div>
      </div>
    </main>
  );
}
