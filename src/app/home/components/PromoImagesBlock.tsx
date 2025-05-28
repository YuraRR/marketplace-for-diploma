import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const promoImagesPath = "/images/promoBlock/";

export const PromoImagesBlock = () => {
  return (
    <>
      {/* Центральная часть */}
      <div className="col-span-1 lg:col-span-2">
        {/* Большой баннер */}
        <div
          className="relative h-[310px] p-6 bg-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url("${promoImagesPath}promoHeadphones.png")`,
          }}
        >
          <div className="m-3">
            <h2 className="text-3xl text-white">
              <b>Noise Cancelling</b> <br /> <span className="font-light">Headphone</span>
            </h2>

            <p className="mt-4 max-w-[160px] leading-5 ml-6  text-xs text-white">
              Wi-Fi, голосовий помічник, ігровий режим з низькою затримкою
            </p>
            <Link href={"/products/Навушники"}>
              <Button size={"xs"} color="white" className="px-5 mt-10">
                Купити
              </Button>
            </Link>
          </div>
        </div>

        {/* Два меньших баннера */}
        <div className="grid grid-cols-2 gap-4 h-[120px] mt-4">
          {/* Sono Playgo 5 */}
          <div className="flex items-center h-[120px] w-full p-4 bg-white rounded-lg">
            <div
              className="flex flex-col w-full"
              style={{
                backgroundImage: `url("${promoImagesPath}promoPlaystation.png")`,
                backgroundSize: "cover",
                backgroundPosition: "right",
              }}
            >
              <h3 className="font-bold">Sony Playstation 5</h3>
              <p className="font-bold text-light-green">ВІД 23 679₴</p>
              <Link href="#" className="mt-6 text-xs underline">
                ДІЗНАЙТЕСЯ ЗАРАЗ
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 h-[120px] bg-white rounded-lg">
            <div
              className="flex flex-col w-full h-full p-4 rounded-lg"
              style={{
                backgroundImage: `url("${promoImagesPath}promoKeyboard.png")`,
                backgroundPosition: "right",
              }}
            >
              <h3 className="font-bold text-white">
                Logitech Bluetooth <br /> <span className="text-yellow-500">Keyboard</span>
              </h3>
              <Link href="#" className="mt-6 text-xs text-white">
                Найкраще для всіх пристроїв
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Правая колонка */}
      <div className="col-span-1">
        <div
          className="flex flex-col items-end justify-center h-[215px] p-4  rounded-lg"
          style={{
            backgroundImage: `url("${promoImagesPath}promoWatches.png")`,
          }}
        >
          <article>
            <span className="text-xs">XIAOMI</span>
            <h3 className="text-lg font-bold">
              Sport Water <br /> Resistance <br /> Watch
            </h3>
            <Button size="sm" color="darkGray" className="mt-4">
              Купити зараз
            </Button>
          </article>
        </div>

        {/* OKODO HERO 11+ Black */}
        <div className="flex items-center justify-between h-[215px] mt-4">
          <div
            className="flex flex-col w-full h-full p-4 rounded-lg"
            style={{
              backgroundImage: `url("${promoImagesPath}promoCamera.png")`,
            }}
          >
            <h3 className="text-2xl font-bold text-white">
              <b>OKODO</b> <br /> HERO 11+ <br /> Black
            </h3>

            <p className="mt-auto font-bold text-light-gray text-light">
              ВІД <br /> <span className="text-2xl text-light-green">7 039₴</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
