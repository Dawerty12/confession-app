import Image from "next/image";
import Link from "next/link";
import GuadalupeMary from '@/assets/GuadalupeMary.svg';

export default function Home() {
  return (
    <div id="main" className="bg-white w-full flex justify-center flex-col">
      <div id="guadalupe-image" className="flex justify-center h-80">
        <Image src={GuadalupeMary} alt="Guadalupe" width={300} height={100} />
      </div>
      <div id="body" className="w-full flex flex-col text-center justify-center items-center">
        <h1 className="text-roman-red font-bold text-2xl">Não sabe como fazer sua <br />confissão? <br /> Nós te ajudamos.</h1>
        <div id="text" className="w-5/6 flex flex-col mt-6 font-medium">
          <p>
            Este aplicativo foi desenvolvido para auxiliar os fiéis na preparação para o sacramento da confissão. As perguntas são cuidadosamente elaboradas com base nos mandamentos e nas orientações da Igreja, evitando qualquer linguagem inapropriada, e incluem referências aos ensinamentos dos santos para oferecer um direcionamento espiritual.
          </p>
          <br /> 
          <p>
            Após a reflexão, é possível gerar um PDF com a confissão organizada de forma prática e acessível para ser apresentada ao confessor.
          </p>
          <br /> 
          <p>Reforçamos que nenhum dado do usuário é armazenado, garantindo total anonimato e segurança.</p>
        </div>
      </div>
      <div id="button" className="w-full flex justify-center text-center">
        <Link href="/commandments" className=" bg-roman-red mt-10 p-6 rounded-lg text-white w-2/3 font-semibold text-lg" >
          Fazer exame de consciência
        </Link>
      </div>
    </div>
  );
}
