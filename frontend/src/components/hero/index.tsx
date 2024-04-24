import Image from "next/image";
import heroImg from "../../assets/hero-01.png";

export function Hero() {
  return (
    <>
      <section>
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center absolute z-10">
          <div className="flex flex-col w-full text-left pt-64 text-purple-700 px-10">
            <h1 className=" text-5xl font-bold leading-tight text">
              O Portal do Analista <br />
            </h1>
          </div>
        </div>

        <div className="h-fit min-w-full bg-cover bg-gradient-to-b from-indigo-900 to-blue-500 opacity-75">
          <div
            className="h-screen min-w-full opacity-95"
            style={{
              backgroundImage: "url(./img/hero-02.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </section>
    </>
  );
}
