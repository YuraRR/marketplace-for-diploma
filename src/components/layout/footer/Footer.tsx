"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebookF, faInstagram, faYoutube, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const topCategories = ["Ноутбуки", "Навушники", "Телевізори", "Камери", "Клавіатури", "Аксесуари"];

export default function Footer() {
  return (
    <footer className="w-full bg-white rounded-lg ">
      <section className="max-w-[1300px] mx-auto px-8 pt-8 pb-4 mt-4">
        <div className="flex justify-between ">
          {/* Логотип та контактна інформація */}
          <div>
            <h3 className="text-lg font-bold">POLYTECH</h3>
            <p className="mt-2 font-bold text-green-500">ГАРЯЧА ЛІНІЯ 24/7</p>
            <p className="font-bold text-green-500">(066) 091 2048</p>
            <p className="mt-2">Першотравневий проспект, 24, Полтава</p>
            <p className="mt-1">contact@polytech.com</p>

            {/* Соціальні іконки */}
            <div className="flex mt-4 space-x-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="p-3 transition-transform duration-200 bg-gray-300 rounded-full size-4 hover:scale-105"
                />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="p-3 bg-gray-300 rounded-full size-4 hover:scale-105"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="p-3 bg-gray-300 rounded-full size-4 hover:scale-105"
                />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="p-3 bg-gray-300 rounded-full size-4 hover:scale-105"
                />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faPinterest}
                  className="p-3 bg-gray-300 rounded-full size-4 hover:scale-105"
                />
              </a>
            </div>
          </div>

          {/* Топ категорії */}
          <div>
            <h3 className="text-lg font-bold">ТОП КАТЕГОРІЇ</h3>
            <ul className="mt-2 space-y-1">
              {topCategories.map((category) => (
                <li key={category}>
                  <Link href={`/products/${category}`} className="hover:underline">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Форма підписки */}

          <form className="max-w-[500px]">
            <h3 className="text-lg font-bold text-center">
              ПІДПИШІТЬСЯ ТА ОТРИМАЙТЕ <span className="text-red-500">10% ЗНИЖКИ</span> НА ПЕРШЕ ЗАМОВЛЕННЯ
            </h3>
            <div className="relative flex justify-center mt-4">
              <Input
                type="email"
                placeholder="Введіть вашу електронну адресу"
                className="w-full h-10 pr-32 border-none shadow-sm ring-light-green focus:ring-0 focus:border-none"
              />
              <Button
                color="white"
                size={"sm"}
                className="absolute right-0 font-bold -translate-y-1/2 top-1/2 text-light-green"
              >
                ПІДПИСАТИСЯ
              </Button>
            </div>
            <p className="mt-2 text-sm text-center">
              Підписуючись, ви погоджуєтеся з нашою{" "}
              <a href="#" className="underline">
                Політикою конфіденційності
              </a>
            </p>
          </form>
        </div>
        {/* Нижняя строка */}
        <Separator className="my-8" />
        <div className="flex items-center w-full mx-auto mt-8">
          <div className="flex justify-start flex-1">
            <p className="text-sm text-gray-500">© 2025 POLYTECH. All Rights Reserved</p>
          </div>
          <div className="flex justify-center flex-1">
            <Image src={"/images/paymants.png"} alt="paymants" width={300} height={28} className="" />
          </div>
          <div className="flex justify-end flex-1">
            <a href="#" className="text-sm text-blue-500">
              Mobile Site
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
