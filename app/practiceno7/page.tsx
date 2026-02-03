"use client";
"use strict";
import Button from "@/components/Buttons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Home, Plus, FileText, BarChart, ArrowUp, PackagePlus, ShoppingCart, Box, X} from "lucide-react";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
import Modal from "@/components/Modal"
import Toast from "@/components/Toast";
const Dashventory = () => {

    const [toggle, setToggle] = useState(true);
    const [page, showPage] = useState([
        true,
        false,
        false,
        false
    ])

    const [theme, setTheme] = useState(false);

    function handlePage(index: number) {
       showPage(page => page.map((_,i) => i === index ? true : false));
    }
    
    function scrollTo(section: string) {
        const element = document.getElementById(section);
        element?.scrollIntoView({behavior: 'smooth' });
    }
  


const [filterValue, setFilterValue] = useState <string>('');
const [products, setProducts] = useState(
    [
            // Electronics Products
        [
            {
                title: "Laptop",
                img: "https://www.asus.com/media/Odin/Websites/global/ProductLine/20250425023629.png",
                description: "A portable, battery-powered personal computer with a built-in screen, keyboard.",
                price: 999.99,
                quantity: 15,
                category: "Electronics"
            },
            {
                title: "Smartphone",
                img: "https://images.philips.com/is/image/philipsconsumer/f11c3bb618c747b9a726b1be001e23ba?$pnglarge$&wid=1250",
                description: "A handheld, touchscreen device for communication, apps, and media on the go.",
                price: 699.990,
                quantity: 30,
                category: "Electronics"
            },
            {
                title: "Television",
                img: "https://media.istockphoto.com/id/638043774/photo/modern-curved-4k-ultrahd-tv.jpg?s=612x612&w=0&k=20&c=ZJBK7-64tG3uPBtXuUnWt-lAPSqz_nBlYXNYsVtmRtc=",
                description: "A screen-based device for watching shows, movies, and streaming content.",
                price: 549.99,
                quantity: 12,
                category: "Electronics"
            },
            {
                title: "Headphones",
                img: "https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg",
                description: "Wearable audio devices for private listening.",
                price: 149.99,
                quantity: 50,
                category: "Electronics"
            },
            {
                title: "Tablet",
                img: "https://d1rlzxa98cyc61.cloudfront.net/catalog/product/cache/1801c418208f9607a371e61f8d9184d9/1/9/197235_2025_8.jpg",
                description: "A touchscreen, portable device for browsing, media, and light computing.",
                price: 399.99,
                quantity: 20,
                category: "Electronics"
            }
        ],

        // Household Products
        [
            {
                title: "Chair",
                img: "https://mandauefoam.ph/cdn/shop/files/mandaue-foam-max-high-back-office-chair-1151825349.png?v=1760957043&width=900",
                description: "A piece of furniture for sitting.",
                price: 89.99,
                quantity: 40,
                category: "Household"

            },
            {
                title: "Table",
                img: "data:image/jpeg;base64,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",
                description: "A flat-surfaced furniture for work, dining, or holding items.",
                price: 199.99,
                quantity: 15,
                category: "Household"

            },
            {
                title: "Bed",
                img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxESEhUSEhAVFhUWGBcVFhIWFxAVFxcXFREXFhUSFRYYHSggGBolGxUVIjEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFQ8QGy0lHR0tLSstLSstLSstLS0tLSstLS0tKysvLTUtLSsrLSstLTc4Ky0rKzcrLS0rLSsyLTctLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAAcBAAAAAAAAAAAAAAAAAQIDBAYHCAX/xABMEAACAQICBQYJBwgIBwAAAAAAAQIDEQQhBQYSMUEHE1FhcYEiMlSRkpOhwdIVF1JTc7HRFBYjJDOywuFCQ2KCorPT8DREY2Ryg6P/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/8QAHREBAAIDAAMBAAAAAAAAAAAAAAERAhIhQVGBE//aAAwDAQACEQMRAD8A3iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwblg0pWw+BTozlCU6sYOUXZ7NpSaT3q+zY0fhtY8am5fleITTyfOVPPm8wOqQcoS09i6lRuWJrvjtc7V/EnxWtGPm4p4uvJLJfpKmS7mB1YDlWvrPjYwdOOLr7N7252pv7b3JMLrLjqcbxxleLlk/wBJUeXe2B1aDkmhp3F3c/ymumndPnau/wBIhV0/jKk7yxVd33vnan4gdbg5Kxms+OlFReMrtR3Lnan4kZ6y41U+bWMr7Lzcedqb+29wOtAckYTWTHU03HGYiLd0/wBLVd13tlHDadxae0sVXTWafO1t/pAdeXDZx/iNO4upPaniq7b3vnavxDF6dxcoqEsVXlGO5OrVdvbmB2BcKRx/8t4uMHTWKrqLs3Hnatr+kUsPpbExV44mtFvLKrVV13SA7E21uuhKaW9pHGsMfW2trnqt/pc5Uv573JcRjq03edWpN9Mpzk/awOzJVEt7S7wpp7mcZ4nGVZ2U6s5bPiqU5yt2XeXcZPyYaQqx0pg1ztS0qmzKO3OzThJWavZrcB1OAAAAAAAAAAAAA13y4pfkEM91aFl0+DPLzfcaDrzdslc3zy6L9Rpfbx/yqhomjF53AhUdlkSUr7N3vEYPaz3ElZO+QEKV23fcuJLUu2kirWVlZEqVo57wJK+WSDVo9ZCknnfuIWbkugCFJOzb7iWF23fcTVk+Aq5LICnNu9kKmW4mgss95JFPO4EeHWU4LffuI2ba6BUXQBKk2+ohNvgTy3EsVlmAmSrcRSzJWARknJxb5UwV3Zc8t3Tsu3tsY3I9/k/y0lgvt4e8DrcAAAAAAAAAAAABgHLWl8nq+/nadu3O/suaAxKlbwd5vrlwf6jT+3j+5M0TTTV7vs7AJayyy3klOL2c95GEHtNt5EtZNtWfaBJSTu7vLgU5puWTyL+lo2pWUuaSbja62op533J79xJU0TiIR8KjPtSv91wLKv0IjbLrJVSlG+0muhNNfeSxjd34dAEaasnd9hLFO93uJ3QnPKMZPsjJ/cXb0TXcf2bikt8mo+x5+wDzpXbyFXqK+HwsnPmk053ayatkr7+ORHFaNq0c6kcnuks15+HeBb2yXSSxW+5KpJverCee4Aln1EJ9RGXQRpU28km31JsCWZBFSrhpQfhq11dJ2KLQCKMj5OnH5Uwe0rrno5ddnb22Mdke9qFlpLBfb0/vA64AAAAAAAAAAAAAa65cZfqNP7eP7kzQ9aLlknY3vy5/8DS+3j/l1DRcIKN8wIVFlZEdHxjGUFPNbcNpPjHbW1HzX85LGHhbV+4hCjzlSEU85SjFJcXKSSXnYHQ75NNHRfOUISpSateEpNNNp5qTa4ItsbqFTv8Aoq8o/wDlGM8+5pmdUY7MEnwSXmR4uk6nFStFX2utbPH+WYuoGJVNRJLfjIL/ANS98y3lqT/31L0Ir+M9PE6QTyhSqS4XSjCLv4r2pPacXnm80s+KPH0lXnJX5maW/wDaQcrLJ+C3ZyvuW7ZzeZH6T6VSp+ZPF4xW/sU4v2uZYaR0BgKNOtUqKc1TpVJbUpJeEoPZaUUs78M8zzK9KTu0pReV7tReb3Np2qIoa94mrLDczQi584rS2bO0YJWi+128zKiZnwz6wzkwwtDEaQhSxG2+cU9hxlstVEtpN5ZppSXebg0hqLBL9FWkuqSi1/hsaj5PtF4mjpHC1ZUZRjGotqclZKLi023wyZ0ZWxNKytUi+yUX7yqTbVOK1Tmm05UHa921Lhv3wLCrqZT4xwy63tRTv0PYs+42JpeW/ZabalaLWT45u1utX48THKkpbc9lOLvBynJSdN5pNQTzWbyfQsnEm5XDGqGo1FvOph4NcJOqvZKK6T1HqPKKVsTTjHohS4dVpIoYmN1LZpuOzKafObTl4rfg77vLOOe/fxXuaAxH6KMOhZb/AGXESyWv9ftXqWHo06qrzlNz5tQko7LjsuUprO6s1Fcd5hCdjN+VfD1VOjJp81suKd8tvabkmuDtYwU1ipE97UGTWk8G19fDf1vMx65knJ3SctJ4KMV/XRfdG8n7EwOtgAAAAAAAAAAAAGuuXJ/qNL7eP+XM0hhcHPESVKlHak+F0l1tt7kuk3xyw6Oq18JRp0YOUniKcbL+2pQTfQryV3wWZYauYDCaJpbMFCriJftK0rQTf0YZNqC9u82Itkse0PqVQpxSeFq4maWbaqxpdkY2V11yb7j3cLoqvS/Y6KhTtmnGnSTTW53cr3PVlrfN/wBKmupOcvci1nrbU+uj3Ql8RdT6Sp1aWkpb8LLz0/jLerg9IeSPz0/iK/52T+u/wv4ilV1qq8Kr9FfEV0482WHx7k0sNO63+CuPXew+TdI8MPPzUl7y9jrLWt+3/wAK9zIrWSt9cvRfxC8jiw+R9Jt/8PLz0PiJZ6C0ild4aXdKg/ukel+ctf66PoP4ySesmI4V4d8JfGLyOPJoaGx8k2sLPJ2zUI/vNXKktXtI+Sy9Oh8RefnFivKYdiptfxEktP4nymHq5fELyOLWOg9JLdhp90qPxk60DpPyfz1MN8RW/ODEccTH1cviKctO4nyqPq38YvI4px0BpSeaoJcLylh17yo9V9JPfSo986PuKT03iV/zndsWX7xL8vYnylehb+IXkcRxWrOPlHZqYSlUje+zt0Wr2tdJtZ5vzmIad1Jik5Sw9TCvp8el/es3s9zRmcNY8Qv65P0l/EVo60VXlJQmnvW08/OiZufDWisbg50ZuE1Zris01wlF8Uz3+TGts6VwbX1qXpRkn95lWuegqeKpuph6exVh4XNLZtNPOSp23PK+zxe4w3UKTWksH9vTXR/Ssc5U68AAAAAAAAAAAhJ2zImieUDX+rWq1cMm6dKEpQ2Y5Oey2nKb4ptbtwG1paw0K/PU6M9p0lFSmrOKlU20lF8WthmqYynOTcnvbz7zEcHrG6bvTcotWeUpK9s1tLc+8mpaxyjdupKXQrRVu+2ZeOVMmLZfzViDTMNlrFOW6co9ln7GRq6xydltvreS7zd2Uy1IMw+Gn5Rv4cnfg1HLvSuUvl2ct05Lsf4jcpmbk+gkUrmH1dYZ2S2n25K/XkQjpuad9uTXQ7W+643KZiSSgYY9OTb8drsZGenppJObfXufsG5TMNkhJdZhkdM1FZ85Lsya9pTq6ZnJ+PJdjZm5TNWuspN26TDlpipFWc5Pte4pw0pU37cl3v3jcpmlxtdZhNXS05PxmuxyQelZpW2pPtby7BuUzVy6ym79JhMNIT3qcl2SYq6Um34z87Q3KZtCc43lGTVlftsY+8bSw2laeJlFunCrSruMbN2lCM5bKbSvtNux5i0rUStzkmuhv37y1lX2nd77b+OW4yZtsQ6+0Jpihi6Ua+HqqpTlukuDW+MlvjJdDzL85R1E1qr4DFU5UW9mc4Qq0nfZqRlLZzX0le6fuOrYslqIAAAAAAay5Vtd3hprB0qjhKUNupNJbWzNtRjFvdfZld791gPb1r15pYe9Og1Uq7m73hDta8aX9ld5oHTbcqspN3cm3J9Lcm2/aXPy3TWVm+tu3sRSrY2jKW1Jf3f53A8aFG0r37iNSnfK56jxuHd1zMb9NvaUYYqhFZ01J9Mr+xAWVKnZW3lN0btO56NSrQlns2XRHj+BH8uw+5UV2737XvAsZwKdGla+Zf08RQi23Da6E9y/31iriaE1lDZ61a/YB5lSlfiVpx6C7eNoJJKku15t9buS89RvtOH93h1bgLGnSs7ktWFy+ljKUlbmkuwh+U0oxyhd9LzAtHHKxTjTzuXrqUpZuNupZXFTGU22lTilwsgLGauRjGysXVOvSin4CbfF52ITr05LxLZ8LAWexmJovKuNhuVOK7kS060E9pwT6nZ94FrCNkSOBdSxEJX8FLsDxEUrKK7crgW8yEFYuI1IXTce7gQlXi34qAtn/t+83nyS8qHObGBx0/0mUaOIk/2nBU6jf9PdaV/Cv079JqpFLxV2kqqR32A7PuRNH8jmv+Kq4tYLEVJVac4SdOUrOdOUFeznvlFq++7TsbwAAAAc4ct9dS0rNJ+LRpRfb4UvulE6PNda68lFHSGJeK/Kp0pSjGMoxhCabirKWbVna3mA51cbvfYmbN2LkGocdIVvV0l7ydchGG446v6NH8ANHxjbO5LJX4m9VyEYTy3Eeaj8JFchGD8txPmofCBoyVllckhBXvc3uuQnBeWYn/4fARXIRgfK8V56HwAaHqEYpJbzfHzE4HyvFeeh/pkVyE4DyvF+lh/9MDQbSbzZNNo34uQrR/lOK9Kj/pky5DNHfX4r06XwAc/04pcSWbudBrkM0b9difTp/AR+Y3Rn1uJ9OHwgc+XssiEEt9zob5j9GfTxHrI/CTLkQ0X9LEesX4Ac7SzIqyR0SuRLRfTX9Z/ImXInor/r+tf4Ac4yzJpM6N+ZTRPRX9a/wHzKaJ6K/rZfgBzjBIhI6P8AmU0T0V/Wy/AfMpon6Nb1svwA5xysQS4nSHzK6J+jW9bIfMron6Nb1sgObmwlZHSPzK6J+jW9bIfMron6Nb1sgNW8hmJjDS0FJePTqwi+iTSl90Wu86ZMO1Z5NNHYGssRRpzdRJqLnOU1G6s2k+NuJmIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==",
                description: "Furniture for sleeping or resting.",
                price: 599.99,
                quantity: 10,
                category: "Household"

            },
            {
                title: "Lamp",
                img: "https://www.reginaandrew.com/SSP%20Applications/NetSuite%20Inc.%20-%20SCA%20Mont%20Blanc/Development/assets/img/13-1552WT_1.jpg?resizeid=3&resizeh=600&resizew=600",
                description: "A device that provides light.",
                price: 49.99,
                quantity: 35,
                category: "Household"

            },
            {
                title: "Refrigerator",
                img: "data:image/jpeg;base64,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",
                description: "An appliance for keeping food and drinks cold.",
                price: 899.99,
                quantity: 8,
                category: "Household"

            }
        ],

        // School Supplies Products
        [
            {
                title: "Notebook",
                img: "https://cdn.tc.promotron.com/web-images/19940d4b-5976-4abd-9956-0d7ae9388c56",
                description: "A book of blank or lined pages for writing or drawing.",
                price: 2.99,
                quantity: 120,
                category: "schoolSupplies"
            },
            {
                title: "Pencil",
                img: "https://hbw.ph/wp-content/uploads/2017/10/yellow-pencil-2.jpg",
                description: "A tool for writing or sketching.",
                price: 0.49,
                quantity: 300,
                category: "schoolSupplies"

            },
            {
                title: "Eraser",
                img: "data:image/jpeg;base64,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nLy4OM09S4yT5Mp8WYG0YvlFgDva5XQuIIDJHLGIzIXU87RGHZS8lrQG5/hvtfoobhfgueMtknn5LRe1NREsZqMv30vvSm3UkkdHLrw2rGO2/wA/PoxvEzaNNqkmdISyE2ANnyWuGkbtYDo5/wCjetyMqy6amaxuVosNzc3JJ3c5x3J7lXIomtaGtADQLAAWAA2AA2CxKrE42aDxO7Db1K55loisXoXyVAyQB9spzTH7ptmmxDRqXAm/Xc2tclXKlkAeXPPPfc5Wn3GC5sANtBYddtgrFVXySaE2b2Gg9e6x2tUzeUdsMiqrnv0Js35W6D+6x2tusumoHO6KcosHA1KoshKbD3O6KcosHA1KloadrdgryCzFTtbsFeREBERAREQEREBERAXjm3XqIIHGsJDwSBqrOEYm6/ImPj+Fx+Mdj/N+62NzbqDxnCQ8XG+4t0KCSRu4UPhGJEnkzf8AUHuuPxj/ALlMN3ChKKm3KtXVc51KtqAVQWPU1bIxd7gOw6n6DqomoxeR+kTcjfmdqfQdFKE1F/14/wAEn7xq5VYnGzQeJ3YbepWswxkEuLnFx0JJOo7HyV0NUjJqq+STQmzew0Hr3WMGrLp6Fzuim6LBgNSghaagc7opuiwcDUqXhpWt2CvgILENM1uwV9EQEREBERAREQEREBERAREQEREBeObdeoggsZwoPFxodwRuD3CowfEiXCGXSQbH5wP9VPuF1C4thQdqNCDcEbg+SDAr6yOO5e4DsOp+gUNPisr9I25G/MdXeg6K+7BXBxcbucdydT+aGicOigR7KYXzOJc7udSr7WrLhoHE7KZosG6lSIWnonO6KbosG6lTEFK1vRXwEFiCla3or4C9RAREQEREBERAREQEREBERAREQEREBERAREQF4QvUQWzEOypNM3sryILLKdo6K6AvUQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/9k=",
                description: "An item used to remove pencil marks.",
                price: 0.79,
                quantity: 200,
                category: "schoolSupplies"

            },
            {
                title: "Backpack",
                img: "https://media.istockphoto.com/id/2167589456/photo/yellow-backpack-opened-isolated-on-white-school-bag-advertisement-design-knapsack-rucksack.jpg?s=612x612&w=0&k=20&c=5B7A5M35ZEcneBbRoLWkIpPcij1HKTdPtkXEm71MMKI=",
                description: "A bag worn on the back for carrying items.",
                price: 39.99,
                quantity: 45,
                category: "schoolSupplies"

            },
            {
                title: "Ruler",
                img: "data:image/jpeg;base64,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",
                description: "A tool for measuring or drawing straight lines.",
                price: 1.29,
                quantity: 150,
                category: "schoolSupplies"

            }
        ],

        // Accessories Products
        [
            {
                title: "Watch",
                img: "data:image/jpeg;base64,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",
                description: "A device worn on the wrist to tell time.",
                price: 79.99,
                quantity: 25,
                category: "Accessories"
            },
            {
                title: "Belt",
                img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUXGR0YGBcXFxYVHRgXGhcYGxcXFxgYHSggGBolIBgaITIhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OFxAQFy0dHR0rLSstLS0tKy0tLSstKy0tLS0tListLS0tKy0tLS0tKy0tLSstKy0rLS0tKy0tLS0tLf/AABEIAOcA2gMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAGAAQFBwECAwj/xABSEAABAgMEBAgICgYIBgMAAAABAgMABBEFEiExBkFRYQcTInGBkbHBIzJCUmKSodEUM0NTgqKywtLwJGNyc5OzFTRUg6PD4eIWFyVEZPEI0+P/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQMCBAX/xAAgEQEAAgIDAQADAQAAAAAAAAAAAQIRMQMSIUEiMlET/9oADAMBAAIRAxEAPwC8YUKFAKFChQCjVawASSABiScAAMyTG0VXwt6Tk1kmiafKkYXjmG6+aMCqmdQNsBH6bcLLhWpqz6JSMC+oBRWdfFJOAT6Sq12AUJBFaa2kT/W3elRPbgOikNkyRzp3dkbfA4DZemNp/wBtf9cxodMrT/tr/rmF8C3fn8iNFSR2QG3/ABtaf9sf9cxsjTG01ED4a/U+mY4LkcKnL8ge0iJKwLPFS4rADLYObpwEBMSMzNqFX5p9e7jV06cceyJaxdJS0vwT9SDikOBY6U1MRDiQqhcoEVwSThXVXzldmrfu+204KLbCkjGpQRTeFEC6d4MBdWjluomkVFAseMnvG6JCenG2W1OurShCBVSlGgAikLBtNySfQoLK2yaJUo4723DrqK0Vroa4ipldNNIlTKwpPxSD4FBoarSU1fdQagpoVBIOvHaI5tbrDulO04PdI+E5wGjCOLTqvDwqhQEKKVclhJBqm8FqOtKc4GEcJtpjy2zztgnLcR+TEIqUOupO/GNDK7o883tL2RxUj4IP+aFp+cx/C/3Rj/mlafnMfwv90QHwUxoqV3Q72/q/50/ggXwo2mfLaHM0O8mOytPLUqEqf8IqhDaGmhRJAIU6pSDdBBBCRiRWt3Co+20GUh0gKXeo2iorfGN8pIIUlJoKHMqGqsP5CV4lOV95eJqczrJPmiuJ1nnjuna25efmmtfKwnTbM8sXnpxwbmyGkjpTyj0mJ2wtMHW6Bay8j0jU9C8689YCXpVqoMwQtRxAUK+o2MhvA5zCXIy6jVKSyo5LQktEmmGYAXzEERu82V9yE6h5AWg1B6wdh2GHEU5oZpI5Kvhp4gpX5QwDiR5QGpSa4p37DFxJUCAQag4g7oKzChQoBQoUKAUKFCgI+3rQ4hlSxQq8VAOtZy6NfMDFGrYLqi4cbxNCdeJJUdpUSVdIiw+ESdvqEuCKeKr6Qq4ehGAOorgc4gQEB8B3Rt8BieSwI24j8/n84wA8ZDdGP6PghLAjHFhIKiCQBWgzO4bSTh0wApaEsKhAzBpX0iCSPopx5zDlag0gCmVAEjyleSkdvWdUdlNm/VWac9YK1G8um0VITl5JhuyoLUp0+IioT6RrRShzkUB2JrtgOfJb8K+sXjlu9FCRq/J2w5kbZacrcPKHkUIVTaB5fMmpABJFIH7aWVqKjzc1NQ2CIZLSlLSlFb5UAmhobxIu0Oo1pjGU8k5b14omPVnWbIoeSXUnwYFSBdIUU0UCiuFcOukbvyalEqIzwA81I8VI3AYRPSEilLaWyUKu0LhCQkl01KlVFALxJUQBhhthw6yNkSfynJWeoRVZ8amzt0FhlhsjBlhsidXfeQkZDdGJazCtYSBmaVNBnzwVOSwplENpC+lphYFwqVRN04mir3KA1YpoCdZ6nU7hxpQddLuIaaF1tJxpmScscSVc66ahG81MKSaIALy8q4htA1ncNQ1qqdsdgkMt0VkgXlU1nM8+IPqiGDzpabLih4VzEjzdiRuSKdJjasYh5bTmcsvTzMqklRK3FYnylq3nYNmQ2Q0Y0xbVyVpISc6gEdIBPYYF56pJJJJOZMRrmBwiotCYaS62LiuSSFIX43FOeSa60nLeCQcxWz+DK3TMS5bXg40bpBzFDQjfQgiuykef9FbY4tfFr+Kc5JHmk6xsqcdxpFi6JWh8Fn21k8l08U4cgVXeQv6SKH+7iC7YUKFFUoUKFAKOb7oQlSjkkEnmArHSB3Tm0Q1L0JpfNCa0olPKUebADpgASZmC4+4tVDQ0FM7yuU591NPRMZvRDyLpCAVABRqpQTiL6iVKpXVUmHSX4B/ejNYZJejYPQDsqhnaboCQDQipcUNobooAb793qjIciPn3Ly1DPEITicUo5RrUYeEUBhWoHRAMLQWpLdAfCLN2vpEm8oc3LX9GG82sJAbTgEgDDbTuHfDqZHhST4rKac6yDUdAST/eRBLdJJJOJxPOc44vPxpx1z60mnBrI64l9ALMC5ovK8RlN7InlKqE4DOgvHnAgTtqTLgwzEWZoBJlmTbSpZDjhKqgVvIrQJJIwBR07Izw1mZjwXtqN0XjUkCppd1ADDVgBCrHFTkYvx04dqwqxwLka8ZAdFmBW2pjjJhCQoKQ0OMwGFeSQK1NTfKNniU1QQuO4E1AoCaqrQUFammqBORXxpcdVm44SaeYiq106VK9QQjaW8g3nBeWhvV8YvfSl0dKqeoYHbWnL6ya1AwHNt6Yl56YIbdePjOKKU8ySU4fSvq6oFHFRqxNn3ASQCK7K4wweEdHZXlhQNKGvtrSMzFKmAZoNDTUc4PbHnC/LjHwiOSdpUnltnpoUk+nAE4In9EJsh25X4xNB+2nFHtEB6h0YtETEqy8DW8gV5xgfaIlIBOCScqw6z825VI2IcF5A6oO4KUKFCgFFUcLlpVdSzmEpSDuKzeVl6KB60WvHnDTS1Q/POrBPjrpvSCEIOexEB3RNw4RM/n85wOpmI7JmvzhAEAmY2E1EAJuNvhnPAEDUzr2Y9WPdDOy3am8QBTlEYeOolashQ1JTjriMfmfBLwKqi7hUUvcmuBB1w5lFFLC1DxlA3efyexPXAd0sksBYSVB1wgkCuKw4JetdvEt47K7YHyYtRVjgWG+UihSQ4gg0ITLFIFCMRg2vEbYrC0G7rigAQKmgNCQk4pqQTXAiMeTbfi04tNFakpGaiEjpNItKWdAASlYKEppdHkKBulKjXEgIBpqvb4r3Rtur6T5oJx25Dt9kF7k2bygopJBu1Tgk3BcBAOIBCQemOIdzGUwX4XHRDCbjPwzfHWU6pYvxop+Iszcc1TW+GTq7W7N3ZdZKQoHkkmnJJxBoczRKqUyIrEUV8SwRTlIaFR6a6rPWb6Y0tlaXCy1U3luUWK4XBdumlK1ot3GuqMzT19Qr5b9fotjjKc1UuDpjqn2WXJ8gx0ss1bcswv5MLLOOtaEJ5R56uHoMCSzF4aaWLWwQKcpsIf6Sqq/qrVFFkxqyc3IbuR3VHFUA1WI6SL5QtKhmlQV1HGMLEckZwF+8F01dnForyXGiQN6VXh9RaeqLXihODSdpMSSzrPFnnUhaP8ALTF9wUoUKFAR+kM/xEq+9822tY5wkkDrpHllx3lHGoAAGvCgqCecmL/4Y53i7NWmtC6tDY1eVfV9VBjznxtSTlU168TAPkvRuHoYX424yAfh6Nw/EelcZC4CRefwArQk1wpiANYplWmvrgjbACW0aryfqcvsb9sC0rVS20HKtRnrPKqOjtgus5rjJhpvzlXemqG/vmAumRs39ADBHjMFKudaDe9pMedZnJBooVbT4xrUpFwkYnAlBpsyyAj1IBHme2WglxaQSbjjqCCME3Xl0CTTEUNdeNYy5GvE76NmhWq4FgJJINKUSDmFYEVIw15Q4RMUERsg4kId5RCqJSADQEFVVVwxpdGsRjjoxmXprCUE1GfhURXHQuNhlcJX4VGhmt8RpejXjD+a90MmEzeKppIUQQ0yCCCSAFi8nMDHw+O8HGM2MkvLl0gUKkFRHpPuCn8xYiLfeSlE+42Tdxbb5RVRNVhvlKxOBbFTBRoBLX7RQnU2G0+ohxf4Y3pHjxcn7LhtuRDsq8xTBbS0D6SCBHk5KsI9gR5NtqW4uZmG8gh1xI5krUnujRwjlwxQohwDUc/fEioRypTHXAcVpjiRjDkiOCxEBvoPNXA2r5t9J63G/wASuuPTEeVtF1+DcGyiupKj2pEepZZd5CVbQD1iCukKFHGbmUNIU44oJQgFSlHIACpJiiqOH60KCVZBp8Y7UZhQCUN09dXVFKpiw+FufE5OhcutLrSWkthSXEAXry1KwJGNSAebdAObNd8z6yPfANQYzWHQsx75s9BT74ybNeHyauge6AbBUZQqOps975lzoQruEYEg8PkXf4ax3QElo+i8+MMga1qMaXcjvMGugSeMtBjfRf8AMX9wQIWMw4gPLKFBQSbtUFNSAo0ApjkBhB9wVNVnx+rb6uR/+kBdEedNKxSamU3hhNP0ThVIUUKqdxqafsno9Fx570yZV8Mm6JFPhDhBAN41Q3XCmKdm8Kjjk0049oUFQl05XXHFKFK15ACcd3KNOYw3vQ5cliENBKHMEcuqV+OVqJoFYAXbowwNK644GXV5quox5peuumt6M3o2+DK81XUY0UimeEFyRVDmynVB5tSaXkHjBUlI8GC4cQDSgSTkcoaGm2OkmUXlXlXfBuXaECqi0oBOOYNaUzoTAnTXKUQk/KPpHOAUn/LMWJwRt3p19Wy/7EtI98V0+qiZJG1xS/VP+/2RZvAiirk0r0l+15X4Y9cafPt7MrajzDp+1ctOcT+tKvWN770eno82cKLdLWmt5SetpuKBRUcyI7lMaFERHAiODoh0oQ3egJzRfEOja37x3x6fsN29LMHa0g9aBHl7RPNW9P8AmIj0Ro/Nfosv+5b+wmCiiB3hAcpIujzrqetaa+ysEUBHC1NXJNI2rKuhDaz20iivLOlkFtBu5pCulQqe2HXwNHmiO0s1QU2YQ4DcQM/gSPNEZ+AI82Ht2M3YBkJFHmiN0SCPNEO7kZSICBtWSReGHkq1b0f6wRcEqazbiqfInH6bfuiEtc+PuQPaVV7BE/wQjw7v7v7490UWrFGzsm26864QDfcWuv7S1EdsXXPv3GnF+ahSuoE90U1JtkpSNdAOmA4f0En5o+qfdGf6BT82fVPuiUmr/Gi7g3mqnFk+MrK/uu7owlKsKqNON81kkM7SLp5WWVdeGUQRwsMeYrqMbCyKalj1hD5zjAlV0qKr5CRxbWKKi6TyMyK41rWmGsdF3vCEBzCnFgtJqoYhRUUpAGo+yAjzZZ9P60YFlp2nrMSN5y+kBJu4XjdWKedjROobOvM9JjxuhP2EwAparAStIPKpiK1NDtFcjzQZcB6OTNbl0/xHoD7aNXQNw7TBhwGfFzP7SftPRRaMeduFNH/Vpj6P8pqPRMed+EldbVmMdgpzIbHdEkCqmo0UiHSjHJZiIZOphq8IeOmGb5wiiZ0RHK6P8xEXvYB/RWP3Tf2BFE6IZ/n5xEX5YDP6LL4fJN/YTElYGCjQVMed7Z04mbQPLDSG0qVxaUpVUJVTxiVG8aAYgDXF/wBqtrUy6lvxy2oJ1copITjz0jzFNtKkVcU824FDzm1przEih6I6BDL2i+dafV/1h+1MzB8pHq/6wJsaSpHySj0Kh63pohObCvaIgJw9Mfqz9E/ihGdfGaWz0KH3oHhwgN/Mq641Xp4yc2lD6X+2AnV226M2kHmKh21iImdPkoXcVLknalwdhRDB/SphYyKecn8MDEwkOPXw43TYVEGnSBFFiWvPNkEAnlXdWFMFYnVjtpBVwSH9JeH6oH68AzawrEYg5a8KQXcEIuzz6dXFYDUBVvAbMawE5wj6dty6lyIaWtxbVSoFKUpC7wpXEk0BOWsYwAMaQqFKM/4n+yOfCOFG1plxWCQUJTzBpHfU9MRTFpsjNfZ74AnRpA6fk1fxVfhjum2Xdbav4hPaIhJe3JUZudnvh+jSGUHyo9nviB+LbVrZV9Q9ojH/ABCBm0voS0e8Q0VpDJ/PJ6j3Q2dtOXVk6k9CvdASLulTCRVd5AG1pJ+zWMyGkUtMXi27eu0vVQ4mlTQHFIAGqAnSVy8g3Kq/ZCj3Q20SaKUuVBSTdFCCDmdsUFE+sKeJBBGFCCCCKA4EZ64MuAtXg5kemPtO++K/dSEC8MMRUDI3lAGo245jGDrgQXRc2j0j7HFe+AtiPMunE1etKbOx1SfVUU/dj00Y8lWlM8a+8757il+soq+9BCLscluRoTHNZiDDjkNHVR0WYbuQBJod5e5I+0T3R6WsCV/RZf8AdN/YTHm7Q9HIcO3k/UUe0iPUFnt3Wm07EJHUkQVF6WWs4whrirl9xwI5YJATdUpZoCNSduuKUVp6q1SlqbQGw2FKTxOF8qKbt4OE+KAcjjei0eEeYu3FfNMTTx50sUT7VRSPBpos3Oz3wdxS0pS2tRKCAeQUJGYOFVRQQCyZPbMdTXvjZNiyZOK5kfRa/HB8jgklRk/MesPdFMu2gtK1oUkhSFFJF9WYJB9oMQdbB0VcmlOr466lLqkUU822qgxrRdcMQOgxL2JYcvxZK3nkqvKHIQlYKQohJvBYrURjRGTcmA8Gwmoq4bxrqAPZXpgbdtBbRCby6EBdAQACvlEDA7YAyVYEqf8AunulgnsXDS0rFlWmXHBMuLuJKrnwdYvUzFSogc5gY/4gV6frD8MaPW2taVIN4hQKSKjIimyAmVrAmkMtpLS3EBZSTebALZcSCAKhRSAMMqjODfgzUW7SCFeMpo1plXlnDdyYDJxof044B8mkJ9SWQ32wS6NzobtJlw5XloPQKfeMUFnCVaFlOsOcaZdyYQCGgqoUVJIBAUKFQBOIB2xVKdEnABSVcIprTXtTDfhITjKp18Rxh53XnVdiRD6zbTmFISS0aEChv3ajbSIG50Td/sjnqqHYIitIbJVLoSoy6m7yroKw5jQEkCpzygt/pJ0ZhY5nD74j7Wmi9xBUFKCHUqotRWki9RVQTQjKu4GAFpWzHVKSFMLAKgB4N0VPmgnXE2dGj/ZnR9F33xNW1aqElkpYYbKHLxMu3xa/EUAbyTqJHXHdvSl04hc10rX+KAGzYFPkHR9F38cOJSznAVXCtN1INFk0JKjQBKjiDdUM+aCEaWPD5WZH01++I6cnVTLrry1rWWpJ8i+SaFINwiuwuHrgI60J08WlK0lCysYaiBQkg7Ms8cYsHgccpOzKfOCldZQrviu9G2h/Rz14A8tak1ANDcQARsNRBlwXTF20k/rGx/LI7URUXDpLN8VKTDmtDSyOcJNPbSPLDbWfOfZh3R6I4V53i7PWNbiko6Ab6vYgjpihJVjkiAaFqOLjcSxahs83ARDiY4FMP3kQ2Ccz+fzSsAXaGy9W0jWtZH1kJ9/VHpkCKD0CkSXZZGxTdRvqVq9lIv2JCq54T1f1kf8AgqSNxefQ3AfwCM3p+Zd2MkfxHUn7kEXCk9/W9yZNHrTN8/ZiN/8Aj0xy51fospHW8T3RRc0eYdP5HibUm0AUBcK/4gDn349PRRXDjZtyfae8l1qnOpskK9im4DjwXruszq9jCu+K8tr407kpHUkQe6FG7IWir9VTrJgDtz49wb+wCAjzDqx2r77SPOWkdZAhtSJrQxm9PSw/XN/zEwExJqv2zPK2Lf8AY+Ej2COsm/eWVebMLHMCV1+yIaaGucZNzbnnKJ9d1au6Oejb95Tw84qUOet73wHbhJp8KSn5thhvqYSs/wA2J2Sl7rTY2ISPqiIPhJFbRmRscCR9FhhH3YJVOCgGyM7u6Gz7NQQdffnA2Aost3gKIK2wRngoLIVzF3DngmccgbcABeTU1vpWkVN0pUFcYaZBQNwV2V2Rw1+CzhAlW22ZW4kJUZcqURmaraGPtiujFi8JKsWE+bKJ9rjcV6pMdXc8ceOQVEzZS6SloL2S6UD+8mGkxEFESzHJs2fPnGWR/irV9yFNryRirrZIpZSjtve1273RJ6HzfFzcm7XWEnmSsV9i44WW3/01tIIF9BzANSStQTjrJwB2kRG2c54NJ1ocHQFAg+2kafWE6Wrw3zBuMt6qKJG0qUhI+91xW6GsIK+E+0Q85LGtbzTROOs31nugaio4qRDOYTD5xUR8y5ARszGktL3lJTtIrzf+qxl9VTDhtzim1OjxvEbG1RwTTmz6DAWtwZS9+ZQumRcUd4SC2g9IumLeiu+Ciz+Lv7G20NA7dv2RFiRIVTPCpMUXMjznWE+pLTC+2JXgEZpLzCtriR6qAfvQM8Jbl6YdH/kH6kqsdqoNuBJm7IrO19XsbbHviiwYr3hrszjJFLwHKYcCvoq5J+tc6osKGdsSCZhh1lWTiCmuwkYHoND0QFE2LhZlobwkdcAlun9Jd3LI6jSLCkpUt2fNNqFDxyWyNhCqEdGUV3aeLzqtri/tGAaGJ/QPCeYOxYPVyvuxAGJnRNy69f8ANStXUy6e6Ad8G4oH1fu/YFkwy0HNX0p2o9yfvRIaB8mWmFb/ALLde+GHB9/WkDcn+a0O+AkdK3OMn31bZh32PrT2JESReiKUkuTNdanXT1zDpiQWikZXa8bDr5hlxvLOVFpuGtfJWlwUprqge2N3zDVrlOJGwg8wyx6wOkRxG2to8kXcJB8LTzWGh1kHugEVBxwgqq+6NjbA+37oCFCO77ccWmkPp5VLLd9KaZB5kszKu0iGJhxay6WcBtmgfVlz+OFNry6TDzgRISpUAoAskpOSgElZSdxpTpiOlWilTzJBrQ0BpWqeUnLCuAyiQtxNJOXTsDfsaPviLamAHGnASagJUValpwpWlCLtw68FCsdZ/JnMfhlKTr5WWVYkXPaKCnQO2MKcjZpvkONj5NV5P7CqdxSfow2WqNGLV96IyZejtMuRFuLqaCCujKSo0GZNBz/nviQlAHZ5hlOLbJvHYVpxJO68Ep6TDMO8S2XPKVyWx2q/PfExwdSKiXHaVJIbTvNQVdZIP0Ygv7g+lbkre+cWpXQOSPs16YJobWdKhpptseQkJ6hiYcwV5802cvTkwNjr56g2kdsWhwSN0s9O9xZ7B3RVGkhrPP8AO8etbQi4uDVukg3zr+2QeyAKIUKFAUtbK6tTJ8+0adHwinZFWziOUo7ST7Ys2YN6Wb2uTSlDnvKUICLcshyWdXLuii0EgeknUobRSh5iN8AOLEPbIVRL5/VL9rTg744vt0jrZ/xT+9JHWKd8BL6NYWfNH97/ACRDHQH48q83i/a+2fuxI2SKWY+dvG/ZA7oi9CDQvHYG/t17oCVkEFS0lIqbhUBtUUqV2w/n55pLaXlqUlKsCUovgLoKVxFL2Jru1wzkXLjaHMrrKDX6I98P3EoIKikLYdwcR5qjj0VOIOo7MIkxlYmY0gnLblT8qvIfJa/KHjatR17BHexLRbWsNNEm8sFSlAJKgFJupoCaJBANMccdlI20dC3AbzFXmzlSl9O5SdZ3jA7sok9FdGnWH2nHaJvLCQioUdSrxu1AGFKVrngNfPWIl3NrTGxFpykmYmD+5HMAl3vUID1iDHS10iYeUBVIcovCvI4sAkbxfqN4gYmmKZYjMHaDkRuIx6Y4vt3xz4jlwrfX+itJ2uOK6mmAO0xh6Odv/FMjcs9Ya90Wm05dCbSw0ZZG/sRSB5tdW1Jrik8YkUGJwDlDn4oB5kbonNO1U4gfvPZxf+sDUrMXVBQ1ZjDEEEKGOGIJHTEt+zukZpgTSkwPBO5gji1jaM09YvDqjhaSeLUUk705YpOR/OsGOFl3QpbJJuKHIURjdOLa+fI9BEObQs4zTXFmgmGqhFfK2oJOo5g9xMbROfXlmMThDzKgdcc5NpFSpxQupFTtPojnygedaUklKkkEGhBFCDsIORjZpCjhkNcA9nJlT7l4D0W0jacABF18F9hgOMtZhocYv9rMfWVUbjFc6JWLdImHEkJT8Wk5qJ8rdXIde+L84ObOLbBdX47pr9EVpzVNTzUiAuhQoUVXneeRenF113+rjW6xb/Bka2awrzi6v1n3Fd8VLNIVxy1pSFYOChUEZqCgQSKHxaU3iLL4P7cl2pFhlx0JWhJCgUrTQlaj5SRtgDiOE/NJaacdWQEtoUtROQSkEknoENm7cljlMM83GJB6iYG+EaZL8smVl1oUuYWEKosfFgFa6kajdCTuVAA9gNuOIs1BYWlIeSS4SCFhQIwFK66wf8IGhiZ9sKSQiYb+LWciPm108k7dVdhIMbobxrkxxTyEo+BC7RJqCtSQEHZQJKumD+A8uWjZK0KU24godRgpBzG8bRvGGIhhLS9GXa7fwe+PR2ltiykykF8UWnxXE4LTurrG47TFN6S2ehorShV8UBvXbtTfGYBI1aoCHTybLc5lfWcu98RGho5L/MjtWe6J6ZliqzlIGZ/+8HuiO0Ys5TaXrxreu06A5Ad58XZM11tNo6kJUfs+2G2jds05CqEEUIOShvh5brJVLtoTmpsEdTQ7AYGmLAmieQgnmB7YA+ZZ1tOADzVEgjmUM+mHlnpWqYYSqnj1FFXjgDqA74idHdFrVXQFlIT5y13BToBr0CCGW0cdRPtS4fo4lBdcWgEBFcEJBJ5SjQnVgRATOiljpmJ2aW4ApDbx5JFQoqQgAK3C4cOaBrS/RZck9xdCWFnwDhJVSpHgDsIxIOsY443bL0Ds/i0zCr5cvPEXzmu7he9pH0YJp6QbfbU06gLQrNJ7dx3jERJrmFi2JeV7Slyk4iONrtV4pO7tIHdFxaRcGDlCJdQdb8lCyELTkKJX4qhhrpn0xWNqyxDraSMQqhGGpyhy5o5rGHVrZdOEFXKZ/vO1ECiVQR8IblHGeZfamBQO7jEtXMuq3xCYlHiQEjxkmqMzUEirYHPVQ3lQ8oQRyjnHJSpBHGJGGNAsahXbsPQdVAhD9NsSkna4BBNUnXhgcsdx1nUd2u188cXxPsCmYl2Jj49s30ihIqhe4Kpn0xiXsiUaNbl4jK8b1TqokeMegmOcva7bgF64um2hI6cxBBYljOzB8CyEpObl26mn7R8borHbM50bslU0+kKBCBifRTvphfOW6vPFzy7YAAAoAAANgGQiH0bsVEs2EJFTmpRzUdsTyYK2EKFCgqhZxspcWk4EKIO4g4iOF2D7hB0JdfUX5M3XT46DdCVnzqk8lW3Ou7EkDVohbCc2K8ykHsiDQYQ2fLiXA6m8pSRTkqSlQFa8krIFM8Kx0csO1k5ybh5k17DDZxE+jxpJ7+EvuEBzkWl8a48q8FuKqSogqoBrKSRtwr7omETjgyWocxpEIbSeHjSro523B2pjX+ngPGbUOeo7YAgM+8RQurPOoxHT6SUKJJJwxJJ1jWYZJ0kZ39Y98ZetlpSaA89YCa0bk+OShulahR6lExIW7Yol0ooKXifYP9YecFkip1zjhg2gKArgVKPmjMpFTjlXDbQk4RLLVxCXQCQ0SVU1JVQXuYU9u6Kn1XEm0ltba8VBCboSs1FKUASQRQAUzvHDMQTyOlLbf/aprtvU7jAuJhB8pPXG14bR1xFWBL6dtUqtu7zKKvuCAuftSVcambQLjzUwtV9CQQCEAhKEkDCoQBWh1ZwyNDDB+zSRd4xXF+YUtmg2JVdvAdZ3xTC1NG9NZNEu0jwgKUC9VAxURVZ8bWok9MSw05k9ThrvQvuBioW26RvdgLAt3Taoo0sAbQD7sIqqeTV1BO0H69e+Je5DGfRy2+cdsQObTssvEEJrSojg3ois+SIsLQeQDrS1EVo4R9RB74LmbJSPJEMCnpXg+Uv/ANe+J+z+CtnNyv55otBqSpHdMvDCBWyNCJJggol0XvOUkKPtgmaYA1Q5S2BG1IpiXNKI6CMwoGChQoUFKFChQChQoUBi6I5ql0HNKTzgGFCgGztjy6vGYaPO2g90NVaKyJNTKMV/dI90KFASEnItNCjbaED0UhPZHV5u8kpORFMN8KFAAM1wRSKySFvpJ2LFOgXYYucDMv5M0+nobPdGYUA1c4GyPEnlj9psHsUIar4I5weLPIPOhY+8YxCgOLnBhaifFmJdXOpafuGG6tAbYTqYVzOj7yRChQDV7Ri2EZyqVczjHe4I5y2itqOrA+ChJ85brN0eotR9kZhRBceiNhfBJcNk3lk3lnUVkAGmwUAHRE3ChRQoUKFAKFChQChQoUAoUKFAf//Z",
                description: "A strap worn around the waist to hold clothing in place.",
                price: 24.99,
                quantity: 40,
                category: "Accessories"
            },
            {
                title: "Hat",
                img: "data:image/jpeg;base64,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",
                description: "A head covering for style or protection.",
                price: 19.99,
                quantity: 30,

                category: "Accessories"
            },
            {
                title: "Sunglasses",
                img: "https://dj3im2gm3txew.cloudfront.net/pub/media/catalog/product/cache/57ddb9b9ec2d560f8bdcb4560fc608f2/o/l/oliver_008-charcoal-dusk-front-sunglasses_1.jpg",
                description: "Eyewear that protects eyes from sunlight.",
                price: 49.99,
                quantity: 20,
                category: "Accessories"
            },
            {
                title: "Wallet",
                img: "https://thetravelclub.ph/cdn/shop/files/57562.jpg?v=1755165818&width=2800",
                description: "A small case for money and cards.",
                price: 34.99,
                quantity: 35,
                category: "Accessories"
            }
        ],

        // Hygiene Products
        [
            {
                title: "Toothbrush",
                img: "data:image/jpeg;base64,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",
                description: "A tool for cleaning teeth.",
                price: 2.49,
                quantity: 120,
                category: "Hygiene"
            },
            {
                title: "Toothpaste",
                img: "data:image/jpeg;base64,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",
                description: "A paste used with a toothbrush to clean teeth.",
                price: 3.99,
                quantity: 90,
                category: "Hygiene"
            },
            {
                title: "Soap",
                img: "https://t4.ftcdn.net/jpg/01/90/54/33/360_F_190543309_KIu0LjY1KVUpjTvJ3cw9gV9pDhywtsZ3.jpg",
                description: "A substance for cleaning the body or hands.",
                price: 1.99,
                quantity: 150,
                category: "Hygiene"
            },
            {
                title: "Shampoo",
                img: "data:image/jpeg;base64,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",
                description: "A liquid used for washing hair.",
                price: 6.99,
                quantity: 70,
                category: "Hygiene"
            },
            {
                title: "Towel",
                img: "https://www.nitori.com.ph/cdn/shop/files/776106601_700x700.jpg?v=1721976410",
                description: "A cloth for drying the body or hands.",
                price: 9.99,
                quantity: 40,
                category: "Hygiene"
            }
        ]
    ]
)

    const categeries: string[] = [
        "Electronics", "Household", "schoolSupplies", "Accessories", "Hygiene"
    ]

    const [modal, setModal] = useState<boolean>(false);
    const [itemIndex, setItemIndex] = useState<number>(0)

    const [updateItemRow, setUpdateItemRow] = useState({
        itemUpdate: "",
        indexRow: 0,
    });

    const searchParams = useSearchParams();
    const itemCategory = searchParams.get('categories');
    const filteredProducts = useMemo(() => {
        const allProducts = products.flat();
        if (itemCategory === "All" || !itemCategory) return allProducts;
        return allProducts.filter(prod => prod.category === itemCategory);
    }, [itemCategory, products]);

    const [filterProduct, setProuctFilter] = useState(products.flat());

    useEffect(() => {
        const timeId = setTimeout(() => {
            const filter = products.flat().filter(e => e.title.toLowerCase().includes(filterValue))
            setProuctFilter(filter);
        }, 500)
        return () => {
            clearTimeout(timeId);
        }

    }, [products, filterValue]);

    const [formData, setFormData] = useState({
        productName: '',
        productPrice: '',
        productQuantity: '',
        productCategory: '',
        productDescription: '',
        productImg: ''
    });

    const [updateFormData, setUpdateFormData] = useState({
        updateProductName: '',
        updateProductPrice: '',
        updateProductQuantity: '',
        updateProductCategory: '',
        updateProductDescription: '',
        updateProductImg: ''
    });


    function deleteRow(index: number) {
        const itemInt = filterProduct[index].category
        const indexOf = categeries.indexOf(itemInt);

        setProducts(prev => {
        const prod = [...prev];
        const items = [...prod[indexOf]];
        const updateItem = items.filter(e => e.title != filterProduct[index].title);
            prod[indexOf] = updateItem;
            return prod
        })


        setToast("Item was removed successfully.");
        setProuctFilter(prev => prev.filter((_, i) => i !== index));
        setModal(false);
        setOpacity(true);
    }

   function findUpdateItem(rowIndex: number) {

    const itemInt = filterProduct[rowIndex];
    const result = itemInt.category;
    const itemCategory = categeries.indexOf(result);

    if (!itemInt) return; 

    setUpdateItemRow({
        itemUpdate: itemInt.title,
        indexRow: itemCategory
    });

    setUpdateFormData({
        updateProductName: itemInt.title,
        updateProductPrice: String(itemInt.price),
        updateProductQuantity: String(itemInt.quantity),
        updateProductCategory: itemInt.category,
        updateProductDescription: itemInt.description,
        updateProductImg: itemInt.img,
    });
}

    
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
     const {name, type, value} = e.target;

            if (type === 'file') {
                const fileInput = e.target as HTMLInputElement;
                const file = fileInput.files?.[0];
                if (!file) {
                    setToast("Oops! You haven’t selected an image yet.");
                    setOpacity(true);
                    return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                    setFormData(prev => ({
                        ...prev, productImg: reader.result as string
                    }))
                }
                reader.readAsDataURL(file);
            } else {
                setFormData(prev => ({
                ...prev, [name]: value
            }))
        }
    }

    function updateHandleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, type, value } = e.target;

        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                setUpdateFormData(prev => ({
                    ...prev,
                    updateProductImg: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setUpdateFormData(prev => ({...prev, [name]: value }));
        }
    }

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const result = categeries.findIndex(e => e.toLowerCase() === formData.productCategory.toLowerCase());

        if (result != -1) {
                setProducts(prev => {
                    const newItems = [...prev];
                        newItems[result] = [...newItems[result], {
                            title: formData.productName,
                            img: formData.productImg,
                            description: formData.productDescription,
                            price: Number(formData.productPrice),
                            quantity: Number(formData.productQuantity),
                            category: formData.productCategory
                        }];
                    return newItems;
                })
                
            setToast("Item was successfully Added on the list.");
            setOpacity(true);
        }

        setFormData({
            productName: '',
            productPrice: '',
            productQuantity: '',
            productCategory: '',
            productDescription: '',
            productImg: ''
        })
    }

    function handleUpdateSubmit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault();
        setProducts((prev) => {
                    const previous = [...prev];
                    const result = previous[updateItemRow.indexRow].findIndex(item => item.title === updateItemRow.itemUpdate);
                    if (result !== -1) {
                        previous[updateItemRow.indexRow][result] = {
                            title: updateFormData.updateProductName,
                            img: updateFormData.updateProductImg ?? products[updateItemRow.indexRow][result].img,
                            description: updateFormData.updateProductDescription,
                            price: Number(updateFormData.updateProductPrice),
                            quantity: Number(updateFormData.updateProductQuantity),
                            category: updateFormData.updateProductCategory
                        };
                    }
        
                    return previous;
        })

        setProuctFilter(products.flat());
        setToast("Item was successfully Updated on the list.");
        setModal(false);
        setUpdate(false);
        setOpacity(true);
        
        setUpdateFormData({
            updateProductName: '',
            updateProductPrice: '',
            updateProductQuantity: '',
            updateProductCategory: '',
            updateProductDescription: '',
            updateProductImg: ''
        })
    }   


    function showModal(condition: string, index: number) {
        if (condition === "show") {
            setModal(true);
            setItemIndex(index);
            return;
        }  
        setModal(false);
    }

    const[opacity, setOpacity] = useState<boolean>(true);

     useEffect(() => {
        const timerId = setTimeout(() => {
            setOpacity(false);
        }, 1500);

        return () => {
            clearTimeout(timerId);
        }
    }, [products, opacity])

    const [toast, setToast] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);

    function submitFunction(index: number) {
         setUpdate(!update);
         findUpdateItem(index);
    }


    return (
        <div className={`m-0 p-0 box-border overflow-x-hidden ${theme ? 'bg-[#121212]' : 'bg-[#E0E0E0]'} text-${theme ? 'white' : 'black' }`} >
            <div className={`h-screen w-screen flex `} >
                    <div className={`fixed top-0 h-screen transform transition-[width] duration-200 ease-in-out   ${toggle ? "w-20" : "w-60"}`} >
                        <aside className={`${toggle ? 'bg-transparent' : 'bg-[#343a40]'} lg:bg-[#343a40] text-[#ccc] h-full w-full `}>
                            <div className={`flex gap-4 transform transition-transform duration-200 ${toggle ? '-translate-x-[120%]' : 'translate-x-0'} `}>
                                <h1 className={`text-center py-3 md:text-xl text-lg ml-[0.5rem]`} > Inventory App </h1>
                                <button className="cursor-pointer text-[1.5rem] ml-[1rem]" onClick={(e) => {
                                    setToggle(prev => !prev)
                                   
                                }}>
                                        {toggle ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}
                                </button>
                            </div>

                            <div className={`flex flex-1 flex-col gap-1 transform transition-transform  ${toggle ? '-translate-x-[143%]' : 'translate-x-0'} `}>
                                <Button label={<span className="flex items-center gap-2"> <Home className="w-5 h-5" aria-hidden="true" /> Home </span>} background="bg-[transparent]" color="text-[#ccc]"  onclick={() => handlePage(0)} ></Button>
                                <Button label={<span className="flex items-center gap-2"> <Plus className="w-5 h-5 text-white" aria-hidden="true" />Add Inventory</span>} background="bg-[transparent]" color="text-[#ccc]" onclick={() => handlePage(1)}></Button>
                                <Button label={<span className="flex items-center gap-2"> <FileText className="w-5 h-5 text-white" aria-hidden="true" />View reports</span>} background="bg-[transparent]" color="text-[#ccc]" onclick={() => handlePage(2)}></Button>
                                <Button label={<span className="flex items-center gap-2"> <BarChart className="w-5 h-5 text-white" aria-hidden="true"/>Analytics Dashboard</span>} background="bg-[transparent]" color="text-[#ccc]" onclick={() => handlePage(3)}></Button>
                            </div>
                            
                        </aside>
                    </div>

                <main className="w-full h-full ">
                    {page[0] && <section className="w-full h-[350vh] font-sans bg-transparent" id="Top"> 

                         <div className=" h-[23%] w-full pt-[2rem]  bg-fixed bg-center bg-no-repeat bg-cover "style={{  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.pixabay.com/photo/2020/10/01/17/11/store-5619201_1280.jpg')` }}>
                             <div className="hidden lg:block">
                                    <header className={`w-1/2 h-12  mx-auto rounded-full flex items-center justify-between p-4 mt-0 z-[-1] shadow-[inset_0px_30px_60px_-12px_rgba(50,50,93,0.25),inset_0px_18px_36px_-18px_rgba(0,0,0,0.3)] backdrop-blur-md bg-${theme ? '[rgba(255,255,255,0.1)]' : '[rgba(255,255,255,1)]' }`}>
                                    <h1 className="text-md lg:text-2xl m-4 p-2 hidden xl:block"> Stocklytics </h1>
                                    <nav className=" text-sm">
                                        <ul className="flex gap-8 font-[600]">
                                            <li className="lg:text-lg text-md"><a href="#" onClick={(e) => {e.preventDefault(); scrollTo("products")}}>Products</a></li>
                                            <li className="lg:text-lg text-md"><a href="#" onClick={(e) => {e.preventDefault(); scrollTo("stocks")}}>Stock Levels</a></li>
                                            <li className="lg:text-lg text-md"><a href="#" onClick={(e) => {e.preventDefault(); scrollTo("Contact")}}>Contact</a></li>
                                        </ul>
                                    </nav>

                                    <label className="border border-gray-500 h-[2.125rem] w-[5rem] relative rounded-full overflow-hidden cursor-pointer flex items-center">
                                        <input type="checkbox" className="peer opacity-0 w-full h-full cursor-pointer z-10" onChange={() => setTheme(!theme)}/>
                                        <span className="absolute top-[0.1rem] left-[0.4rem] w-[1.8rem] h-[1.8rem] bg-black rounded-full transition-all duration-300 ease-in-out peer-checked:left-[2.7rem] peer-checked:bg-white"></span>
                                    </label>
                                </header>
                             </div>

                            <div className="w-full min-h-screen flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8 lg:px-16 tracking-wide">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                                    Welcome to Stocklytics
                                </h1>

                                <h6 className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl">
                                    Helps you effortlessly track, manage, and organize your inventory with real-time updates and intuitive tools
                                </h6>
                                <Button label="Get Started" background="bg-[#228be6]" color="text-white mt-6 md:mt-8 hover:bg-[#1971c2]" onclick={(e) => { e.preventDefault(); scrollTo("products"); }} />
                            </div>


                         </div>

                         <section className={`${itemCategory === "All" || !itemCategory ? 'h-[23%]' : 'h-[15%]'} w-full  overflow-y-hidden snap-y snap-proximity `}  id="products">
                            <nav>
                                <ul className={`w-full h-20 ${toggle ? 'pl-[10%]' : 'pl-[25%]'} pr-[5rem] flex gap-5 lg:gap-8 items-center text-[12px]  lg:text-lg font-[600] transition-all duration-300 ease-in-out `}>
                                    <li><Link href="/practiceno7?categories=All" >All</Link></li>
                                    <li><Link href="/practiceno7?categories=Electronics" >Electronics</Link></li>
                                    <li><Link href="/practiceno7?categories=Household" >Household</Link></li>
                                    <li><Link href="/practiceno7?categories=schoolSupplies" >School Supplies</Link></li>
                                    <li><Link href="/practiceno7?categories=Accessories" >Accessories</Link></li>
                                    <li><Link href="/practiceno7?categories=Hygiene" >Hygiene</Link></li>
                                </ul>
                            </nav>

                            <div className={`w-full h-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4  transition-all duration-300 ease-in-out overflow-y-scroll ${toggle ? 'pl-[10%]' : 'pl-[15%]'} pb-[6rem]`} >
                                {
                                    filteredProducts.map((product, index) => (
                                        <div key={index} className={`flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 bg-white text-sm  lg:text-md ${itemCategory === "All" || !itemCategory ? 'h-full' : 'h-[100%]'} `}>
                                            <Card key={`${product.title}-${index}`} title={ <> {product.title} <br /> <div className="flex w-full items-center justify-center gap-5">{"$" + product.price}{" "} {product.quantity > 0 ? ( <> <span className="flex"><Box /> {product.quantity}</span> </> ) : ( <> <ShoppingCart /> Out of Stock </> )}</div> </> } img={product.img} description={product.description} />
                                        </div>
                                    ))
                                }
                            </div>
                         </section>



                         <section className="h-[23%] w-full" id="stocks">
                            
                         </section>


                         <section className="h-[23%] w-full" id="Contact">

                         </section>

                        <footer className=" bg-[#222431] w-full mt-0 pt-[5rem]  ">
                                <div className={`h-full w-[60%] mx-auto text-white`}>
                                    <h1 className="text-center text-2xl  font-[700]">Stocklytics</h1>
                                    <section className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-[4rem]">
                                        <div className="flex flex-col gap-4 text-sm lg:text2xl">
                                            <div>
                                                <h1 className="text-lg lg:text-2xl">Community</h1>
                                                <ul className="text-[#ccc]">
                                                    <li className="cursor-pointer mt-1.5">Tutorials</li>
                                                    <li className="cursor-pointer mt-1.5">Documentation</li>
                                                    <li className="cursor-pointer mt-1.5">Forum</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h1 className="text-lg lg:text-2xl">Open Source</h1>
                                                <ul className="text-[#ccc]">
                                                    <li className="cursor-pointer mt-1.5">Download</li>
                                                    <li className="cursor-pointer mt-1.5">Github</li>
                                                    <li className="cursor-pointer mt-1.5">Runbot</li>
                                                    <li className="cursor-pointer mt-1.5">Translation</li>

                                                </ul>
                                            </div>

                                        </div >
  
                                        <div  className="flex flex-col gap-4 text-sm lg:text2xl">
                                            <h1 className="mb-0 text-lg lg:text-2xl">Services</h1>
                                            <ul className="text-[#ccc] cursor-pointer">
                                                <li className="mb-1">Odoo.sh Hosting</li>
                                                <li className="cursor-pointer">Support</li>
                                                <li className="cursor-pointer">Upgrade</li>
                                                <li className="cursor-pointer">Custom Developments</li>
                                                <li className="cursor-pointer mb-2">Education</li>
                                                <li className="cursor-pointer mb-2">Find an Account</li>
                                                <li className="cursor-pointer">Find a Partner</li>
                                                <li className="cursor-pointer">Become a Partner</li>

                                            </ul>
                                        </div>

                                        <div className="text-sm lg:text2xl">
                                            <h1 className="mb-0 text-lg lg:text-2xl">About us</h1>
                                            <ul className="text-[#ccc] cursor-pointer">
                                                <li className="mb-1">Our company</li>
                                                <li className="cursor-pointer">Brand Assets</li>
                                                <li className="cursor-pointer">Contact us</li>
                                                <li className="cursor-pointer mb-2">Jobs</li>
                                                <li className="cursor-pointer">Events</li>
                                                <li className="cursor-pointer">Podcast</li>
                                                <li className="cursor-pointer">Blog</li>
                                                <li className="cursor-pointer mb-2">Customers</li>
                                                <div className="cursor-pointer ">Legal Privacy</div>
                                                <li className="cursor-pointer">Security</li>
                                            </ul>
                                        </div>

                                        <div className="flex flex-col gap-4 ">
                                            <h1 className=" text-lg lg:text-2xl mb-1">Contact us</h1>
                                            <ul className="text-[#ccc] cursor-pointer">
                                                <li className="cursor-pointer">+69123456789</li>
                                                <li className="cursor-pointer">1234 Stocklytics St.</li>
                                            </ul>

                                            <h1>INQUIRES</h1>
                                            <p className="cursor-pointer mb-1 text-sm">theMan@gmail.com</p>

                                            <h1>CAREERS</h1>
                                            <p className="cursor-pointer">Dream@halo-lab.team</p>
                                        </div>

                                    </section>
                                </div>
                                <footer className="w-full h-12 bg-[#1b1c26] mt-8 flex items-center justify-center text-white">
                                    <h1 className="text-center text-sm"> © 2024 Stocklytics. All rights reserved. </h1>
                                </footer>
                        </footer>

                         <div className="fixed right-[3rem] bottom-[1.5rem] md:h-[3.125rem] h-[2.125rem] w-[2.125rem] md:w-[3.125rem]  bg-white flex justify-center items-center rounded-full  hover:bg-[#ccc] duration-300 ease-in-out"> 
                            <button className="cursor-pointer " onClick={() =>  scrollTo("Top")}> <ArrowUp  color="black" /> </button>
                         </div>
                    </section>}

                    {page[1] && <section className={`md:w-full md:h-full m-0 p-0 flex justify-center items-center transition-all duration-800 ease-in-out  text-black overflow-hidden`}>
                             <div className={` md:h-[80%] md:w-[70%] mx-auto rounded-md flex gap-5 justify-between items-center flex-col md:flex-row `}>
                                    <div className={`h-full w-[80%] lg:w-[100%] xl:w-[40%] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out  mt-[1rem] lg:mt-0 ${modal || update? 'bg-[rgba(0,0,0,0.5)]' : 'bg-white'} `}>
                                        <span className="flex justify-center items-center gap-3 font-[600] text-lg lg:text-xl xl:text-2xl font-sans tracking-wide pt-6 lg:mb-3"><PackagePlus size={30} /> <h1>Add Inventory Item</h1></span>
                                            <form className="h-full w-full gap-6 flex flex-col xl:p-10 p-5 p-[3rem]" onSubmit={e => handleSubmit(e)}>

                                                <div className="xl:h-[7%] relative ">
                                                    <input type="text" className="border border-black w-full p-[0.5rem] rounded-sm peer " name="productName" value={formData.productName}  onChange={handleChange}  required placeholder=""/>
                                                    <label className="absolute left-1 top-[0.5rem] left-[1rem] peer-focus:top-[-1.5rem] transition-all duration-500 ease-in-out peer-not-placeholder-shown:top-[-1.5rem] text-sm lg:text-md">Product Name</label>
                                                </div>

                                                <div className="xl:h-[7%] relative">
                                                    <input type="number" className="border border-black w-full p-[0.5rem] rounded-sm peer" name="productPrice" value={formData.productPrice}  onChange={handleChange}  required placeholder=""/>
                                                    <label className="absolute left-1 top-[0.5rem] left-[1rem] peer-focus:top-[-1.5rem] transition-all duration-500 ease-in-out peer-not-placeholder-shown:top-[-1.5rem] text-sm lg:text-md">Product Price</label>
                                                </div>

                                                <div className="xl:h-[7%] relative">
                                                    <input type="number" className="border border-black w-full p-[0.5rem] rounded-sm peer" name="productQuantity" value={formData.productQuantity}  onChange={handleChange}  required placeholder=""/>
                                                    <label className="absolute left-1 top-[0.5rem] left-[1rem] peer-focus:top-[-1.5rem] transition-all duration-500 ease-in-out peer-not-placeholder-shown:top-[-1.5rem] text-sm lg:text-md">Stock Quantity </label>
                                                </div>
                                                
                                                <select className="border p-[1rem] rounded-sm" value={formData.productCategory}  name="productCategory" onChange={handleChange} required>
                                                        <option value="" disabled>Select Category</option>
                                                        <option value="Electronics">Electronics</option>
                                                        <option value="Household">Household</option>
                                                        <option value="School Supplies">School Supplies</option>
                                                        <option value="Accessories">Accessories</option>
                                                        <option value="Hygiene">Hygiene</option>
                                                </select>

                                                <textarea className="border border-black w-full xl:h-[20%] placeholder:pl-[1rem] placeholder:pt-[0.5rem] rounded-sm" name="productDescription" value={formData.productDescription}  onChange={handleChange} placeholder="Description" required ></textarea>
                                                <div className="flex items-center justify-center w-full  ">
                                                    <label className={`flex flex-col items-center  justify-center px-4 ${modal || update? 'bg-[rgba(0,0,0,0.5)]' : 'bg-white'} hover:bg-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-black  h-[40px] w-full max-w-sm`}>
                                                        <span className="text-base leading-normal hover:[bg-red-200]">Select a img</span>
                                                        <input type="file" className="hidden"  onChange={handleChange} name="productImg" required accept="image/*"/>
                                                    </label>
                                                </div>

                                                <button className={`w-full ${modal || update ? 'bg-[rgba(0,0,0,0.5)]' : 'bg-blue-400'} hover:bg-blue-500 p-[1.5%] rounded cursor-pointer text-lg font-extrabold text-black font-sans`} >Add Item</button>
                                            </form>
                                    </div>


                                    <div className={`${modal || update? 'bg-[rgba(0,0,0,0.5)]' : 'bg-white'} transition-all duration-300 ease-in-out h-full lg:w-full w-screen shadow-[0_0_10px_rgba(0,0,0,0.1)] ${modal || update? 'overflow-hidden' : 'overflow-y-scroll'}`}>
                                        <div className="flex items-center w-full justify-center transition-all duration-300 ease-in-out z-[999999999]" >
                                            <input type="select" placeholder="Filter table" className={`p-[0.5rem]  cursor-search lg:p-[1rem] border ${modal || update? 'border-transparent' : 'border-[#ccc]'}  m-1 rounded-xl w-[60%] placeholder:text-sm placeholder:lg:text-lg`} value={filterValue} onChange={e => setFilterValue(e.target.value.toLowerCase())} id="hello"/>
                                            <button className={`${modal || update ? 'bg-[rgba(0,0,0,0.5)]' : 'bg-[#00ffff]'} hover:bg-[#008080] m-1 p-[0.8rem] rounded-md font-[700] font-sans cursor-pointer`} onClick={e => {setFilterValue('');}}>Clear Filter</button>
                                        </div>

                                        <h1 className="text-xl lg:text-3xl m-[1rem]">Inventory List</h1>

                                        <table className="border-collapse my-6 text-sm font-sans min-w-[25rem] shadow-[0_0_20px_rgba(0,0,0,0.15)] w-full  text-body">
                                            <thead className={`${modal || update? 'bg-black/50' : 'bg-[#009879]'} ${modal || update? 'text-black' : 'text-[#ffffff]'} text-center`}>
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 font-medium py-[0.75rem] px-[0.9375rem]">#</th>
                                                    <th scope="col" className="px-6 py-3 font-medium py-[0.75rem] px-[0.9375rem]">Title Product</th>
                                                    <th scope="col" className="px-6 py-3 font-medium py-[0.75rem] px-[0.9375rem]">Price Product</th>
                                                    <th scope="col" className="px-6 py-3 font-medium py-[0.75rem] px-[0.9375rem]">Category Product</th>
                                                    <th scope="col" className="px-6 py-3 font-medium py-[0.75rem] px-[0.9375rem]">Stock Quantity</th>
                                                    <th scope="col" className="px-6 py-3 font-medium py-[0.75rem] px-[0.9375rem]">Product Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className={`overflow-scroll text-sm`}>
                                                {filterProduct.map((e, index) =>
                                                    <tr
                                                        key={`${e}-${index}`}
                                                        className={` ${modal || update? '!bg-transparent' : 'odd:bg-[#E8ECEF] even:bg-[#f3f3f3]'}  border-b border-default tracking-wide font-[500] overflow-scroll border-b border-solid ${modal || update? 'border-transparent' : 'border-gray-300'  } last:border-b-2 last:border-[#009879]`}
                                                    >
                                                        <td className="text-center font-medium text-heading whitespace-nowrap text-center py-[0.75rem] px-[0.9375rem] ">
                                                            {index + 1}
                                                        </td>
                                                        <td className="text-center py-[0.75rem] px-[0.9375rem]">{e.title}</td>
                                                        <td className="text-center py-[0.75rem] px-[0.9375rem]">{"$" + e.price}</td>
                                                        <td className="text-center py-[0.75rem] px-[0.9375rem]">{e.category}</td>
                                                        <td className="text-center py-[0.75rem] px-[0.9375rem]">{e.quantity}</td>
                                                        <td className="flex gap-5 py-[0.75rem] px-[0.9375rem]">
                                                             <button className={`p-[0.5rem] px-[1.125rem] border-none rounded-[6px] text-[0.875rem] cursor-pointer ${modal || update? 'text-[rgba(0,0,0,0.5)]' : 'text-white'} ${modal || update? 'bg-[rgba(0,0,0,0.5)]' : 'bg-[#3498db]'} mt-[0.5rem]`} onClick={() => submitFunction(index)}>Update </button>
                                                             <button className={`p-[0.5rem] px-[1.125rem] mr-[1rem] border-none rounded-[0.375rem] text-[0.875rem] cursor-pointer ${modal  || update? 'text-[rgba(0,0,0,0.5)]' : 'text-white'} ${modal || update? 'bg-[rgba(0,0,0,0.5)]' : 'bg-[#e74c3c]'} mt-[0.5rem]`} onClick={() => showModal("show", index)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>  

                                    { <div>
                                            <Modal isOpen={modal} label='Are you sure you want to delete this?' modalInner='This action cannot be Undone' buttonAccept='Accept' methodClose={() => showModal("notShow", -1)} methodAccept={() => deleteRow(itemIndex)}/>
                                    </div> }


                                    <div className={` lg:w-[70%] w-[100%] absolute z-[99999]  transform ${ update ? 'translate-y-0' : '-translate-y-[200%]'} transition-all duration-200 ease-in-out`}>
                                        <div className="relative h-full w-full flex justify-center items-center">
                                            <div className={`lg:w-[50%] xl:w-[30%] w-[70%] lg:h-[70%] h-[50%] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] mt-[1rem] lg:mt-0 bg-white`}>
                                                <span className="flex justify-center items-center gap-3 font-[600] text-xl lg:text-2xl font-sans tracking-wide pt-6 "><PackagePlus size={30} /> <h1>Update Item</h1> <button className="cursor-pointer" title="Cancel Update Form" onClick={() => setUpdate(!update)}><X size={30} /></button></span>
                                                
                                                    <form className="h-full w-full gap-6 flex flex-col p-10" onSubmit={e => handleUpdateSubmit(e)}>

                                                        <div className="xl:h-[7%] relative ">
                                                            <input type="text" className="border border-black w-full p-[0.5rem] rounded-sm peer " name="updateProductName"  onChange={updateHandleChange} value={updateFormData.updateProductName} required placeholder=""/>
                                                            <label className="absolute left-1 top-[0.5rem] left-[1rem] peer-focus:top-[-1.5rem] transition-all duration-500 ease-in-out peer-not-placeholder-shown:top-[-1.5rem] text-sm lg:text-md">Update Product Name</label>
                                                        </div>

                                                        <div className="xl:h-[7%] relative">
                                                            <input type="number" className="border border-black w-full p-[0.5rem] rounded-sm peer" name="updateProductPrice"  onChange={updateHandleChange} value={updateFormData.updateProductPrice}  required placeholder=""/>
                                                            <label className="absolute left-1 top-[0.5rem] left-[1rem] peer-focus:top-[-1.5rem] transition-all duration-500 ease-in-out peer-not-placeholder-shown:top-[-1.5rem] text-sm lg:text-md">Update Product Price</label>

                                                        </div>

                                                        <div className="xl:h-[7%] relative">
                                                            <input type="number" className="border border-black w-full p-[0.5rem] rounded-sm peer" name="updateProductQuantity"  onChange={updateHandleChange} value={updateFormData.updateProductQuantity} required placeholder=""/>
                                                            <label className="absolute left-1 top-[0.5rem] left-[1rem] peer-focus:top-[-1.5rem] transition-all duration-500 ease-in-out peer-not-placeholder-shown:top-[-1.5rem] text-sm lg:text-md">Update Stock Quantity </label>
                                                        </div>
                                                        
                                                        <select className="border p-[1rem] rounded-sm" name="updateProductCategory" required  value={updateFormData.updateProductCategory}  onChange={updateHandleChange}>
                                                                <option value="" disabled>Select Category</option>
                                                                <option value="Electronics">Electronics</option>
                                                                <option value="Household">Household</option>
                                                                <option value="School Supplies">School Supplies</option>
                                                                <option value="Accessories">Accessories</option>
                                                                <option value="Hygiene">Hygiene</option>
                                                        </select>


                                                        <textarea className="border border-black w-full h-[30%] placeholder:pl-[1rem] placeholder:pt-[0.5rem] rounded-sm "  onChange={updateHandleChange} name="updateProductDescription" value={updateFormData.updateProductDescription} placeholder="Product Description" required ></textarea>
                                                        <div className="flex items-center justify-center w-full ">
                                                            <label className={`flex flex-col items-center justify-center px-4  hover:bg-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-black   h-[40px] w-full max-w-sm`}>
                                                                <span className="text-base leading-normal hover:[bg-red-200]">Select a img</span>
                                                                <input type="file" className="hidden"  onChange={updateHandleChange} name="updateProductImg" accept="image/*"/>
                                                            </label>
                                                        </div>


                                                        <button className={`w-full bg-blue-400 hover:bg-blue-500 p-[1.5%] rounded cursor-pointer text-lg font-extrabold text-black font-sans`} >Update</button>
                                                    </form>
                                            </div>
                                        </div>
                                    </div>
                                        <Toast label={toast} background='bg-[#4CAF50]' padding='py-[0.8rem] px-[2rem]' condition={opacity} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
                             </div>
                        
                     </section>}

                    {page[2] && <section className="w-full h-full  m-0 p-0"> </section>}

                    {page[3] && <section className="w-full h-full m-0 p-0"> 
                        
                    </section>}

                </main>


            </div>
        </div>
    )
}

export default Dashventory;