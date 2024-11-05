// Importing all images
import jbl660nc1 from '../Assets/jbl660nc-1.png';
import jbl660nc2 from '../Assets/jbl660nc-2.png';
import jbl660nc3 from '../Assets/jbl660nc-3.png';
import jbl660nc4 from '../Assets/jbl660nc-4.png';

import boat5181 from '../Assets/boat518-1.png';
import boat5182 from '../Assets/boat518-2.png';
import boat5183 from '../Assets/boat518-3.png';
import boat5184 from '../Assets/boat518-4.png';

import boat1311 from '../Assets/boat131-1.png';
import boat1312 from '../Assets/boat131-2.png';
import boat1313 from '../Assets/boat131-3.png';
import boat1314 from '../Assets/boat131-4.png';

import boat1101 from '../Assets/boat110-1.png';
import boat1102 from '../Assets/boat110-2.png';
import boat1103 from '../Assets/boat110-3.png';
import boat1104 from '../Assets/boat110-4.png';

import boat4101 from '../Assets/boat410-1.png';
import boat4102 from '../Assets/boat410-2.png';
import boat4103 from '../Assets/boat410-3.png';
import boat4104 from '../Assets/boat410-4.png';

import jbl200bt1 from '../Assets/jbl200bt-1.png';
import jbl200bt2 from '../Assets/jbl200bt-2.png';
import jbl200bt3 from '../Assets/jbl200bt-3.png';
import jbl200bt4 from '../Assets/jbl200bt-4.png';

import sonyxb910n1 from '../Assets/sonyXb910n-1.png';
import sonyxb910n2 from '../Assets/sonyXb910n-2.png';
import sonyxb910n3 from '../Assets/sonyXb910n-3.png';
import sonyxb910n4 from '../Assets/sonyXb910n-4.png';

import jbl760nc1 from '../Assets/jbl760nc-1.png';
import jbl760nc2 from '../Assets/jbl760nc-2.png';
import jbl760nc3 from '../Assets/jbl760nc-3.png';
import jbl760nc4 from '../Assets/jbl760nc-4.png';

import boat255r1 from '../Assets/boat255r-1.png';
import boat255r2 from '../Assets/boat255r-2.png';
import boat255r3 from '../Assets/boat255r-3.png';
import boat255r4 from '../Assets/boat255r-4.png';

import jbl1001 from '../Assets/jbl100-1.png';
import jbl1002 from '../Assets/jbl100-2.png';
import jbl1003 from '../Assets/jbl100-3.png';
import jbl1004 from '../Assets/jbl100-4.png';

import sony1000xm41 from '../Assets/sony1000xm4-1.png';
import sony1000xm42 from '../Assets/sony1000xm4-2.png';
import sony1000xm43 from '../Assets/sony1000xm4-3.png';
import sony1000xm44 from '../Assets/sony1000xm4-4.png';

import boat2281 from '../Assets/boat228-1.png';
import boat2282 from '../Assets/boat228-2.png';
import boat2283 from '../Assets/boat228-3.png';
import boat2284 from '../Assets/boat228-4.png';

import jblendurance1 from '../Assets/jbl-endu-1.png';
import jblendurance2 from '../Assets/jbl-endu-2.png';
import jblendurance3 from '../Assets/jbl-endu-3.png';
import jblendurance4 from '../Assets/jbl-endu-4.png';

import boat2031 from '../Assets/boat203-1.png';
import boat2032 from '../Assets/boat203-2.png';
import boat2033 from '../Assets/boat203-3.png';
import boat2034 from '../Assets/boat203-4.png';

import sonych710n1 from '../Assets/sonyCh710n-1.png';
import sonych710n2 from '../Assets/sonyCh710n-2.png';
import sonych710n3 from '../Assets/sonyCh710n-3.png';
import sonych710n4 from '../Assets/sonyCh710n-4.png';

import jbl500bt1 from '../Assets/jbl500bt-1.png';
import jbl500bt2 from '../Assets/jbl500bt-2.png';
import jbl500bt3 from '../Assets/jbl500bt-3.png';
import jbl500bt4 from '../Assets/jbl500bt-4.png';

import boat3811 from '../Assets/boat381-1.png';
import boat3812 from '../Assets/boat381-2.png';
import boat3813 from '../Assets/boat381-3.png';
import boat3814 from '../Assets/boat381-4.png';

import sonyex14ap1 from '../Assets/sony-ex14ap-1.png';
import sonyex14ap2 from '../Assets/sony-ex14ap-2.png';
import sonyex14ap3 from '../Assets/sony-ex14ap-3.png';
import sonyex14ap4 from '../Assets/sony-ex14ap-4.png';

import sonyxb4001 from '../Assets/sonyXb400-1.png';
import sonyxb4002 from '../Assets/sonyXb400-2.png';
import sonyxb4003 from '../Assets/sonyXb400-3.png';
import sonyxb4004 from '../Assets/sonyXb400-4.png';

// Products data with imported image references
const productsData = [
    {
        id: 1,
        tag: "hero-product",
        tagline: "Keep the noise out, or in. You choose.",
        heroImage: jbl660nc1,
        images: [jbl660nc1, jbl660nc2, jbl660nc3, jbl660nc4],
        brand: "JBL",
        title: "JBL Live 660NC",
        info: "Wireless Over-Ear NC Headphones",
        category: "Headphones",
        type: "Over Ear",
        connectivity: "Wireless",
        finalPrice: 9999,
        originalPrice: 14999,
        quantity: 1,
        ratings: 1234,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 2,
        tag: "featured-product",
        images: [boat5181, boat5182, boat5183, boat5184],
        brand: "boAt",
        title: "boAt Rockerz 518",
        info: "On-Ear Wireless Headphones",
        category: "Headphones",
        type: "On Ear",
        connectivity: "Wireless",
        finalPrice: 1299,
        originalPrice: 3990,
        quantity: 1,
        ratings: 1321,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 3,
        tag: "hero-product",
        tagline: "Featherweight for comfort all-day.",
        heroImage: boat1313,
        images: [boat1311, boat1312, boat1313, boat1314],
        brand: "boAt",
        title: "boAt Airdopes 131",
        info: "Wireless In-Ear Earbuds",
        category: "Earbuds",
        type: "In Ear",
        connectivity: "Wireless",
        finalPrice: 1099,
        originalPrice: 2990,
        quantity: 1,
        ratings: 1244,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 4,
        tag: "featured-product",
        images: [boat1101, boat1102, boat1103, boat1104],
        brand: "boAt",
        title: "boAt Bassheads 110",
        info: "In-Ear Wired Earphones",
        category: "Earphones",
        type: "In Ear",
        connectivity: "Wired",
        finalPrice: 349,
        originalPrice: 999,
        quantity: 1,
        ratings: 1432,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 5,
        tag: "featured-product",
        images: [boat4101, boat4102, boat4103, boat4104],
        brand: "boAt",
        title: "boAt Rockerz 410",
        info: "On-Ear Bluetooth Headphones",
        category: "Headphones",
        type: "On Ear",
        connectivity: "Wireless",
        finalPrice: 1399,
        originalPrice: 2999,
        quantity: 1,
        ratings: 1567,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 6,
        tag: "hero-product",
        tagline: "Pure bass for pure music.",
        heroImage: jbl200bt1,
        images: [jbl200bt1, jbl200bt2, jbl200bt3, jbl200bt4],
        brand: "JBL",
        title: "JBL Tune 200BT",
        info: "Wireless In-Ear Earphones",
        category: "Earphones",
        type: "In Ear",
        connectivity: "Wireless",
        finalPrice: 2499,
        originalPrice: 5999,
        quantity: 1,
        ratings: 967,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 7,
        tag: "featured-product",
        images: [sonyxb910n1, sonyxb910n2, sonyxb910n3, sonyxb910n4],
        brand: "Sony",
        title: "Sony WH-XB910N",
        info: "Extra Bass Noise Cancelling Headphones",
        category: "Headphones",
        type: "Over Ear",
        connectivity: "Wireless",
        finalPrice: 14999,
        originalPrice: 19999,
        quantity: 1,
        ratings: 1211,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 8,
        tag: "hero-product",
        tagline: "Built for pure music pleasure.",
        heroImage: sonyxb4001,
        images: [sonyxb4001, sonyxb4002, sonyxb4003, sonyxb4004],
        brand: "Sony",
        title: "Sony WI-XB400",
        info: "Extra Bass Wireless In-Ear Headphones",
        category: "Earphones",
        type: "In Ear",
        connectivity: "Wireless",
        finalPrice: 2990,
        originalPrice: 4990,
        quantity: 1,
        ratings: 1043,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 9,
        tag: "featured-product",
        images: [jbl760nc1, jbl760nc2, jbl760nc3, jbl760nc4],
        brand: "JBL",
        title: "JBL Live 760NC",
        info: "Wireless Over-Ear NC Headphones",
        category: "Headphones",
        type: "Over Ear",
        connectivity: "Wireless",
        finalPrice: 13999,
        originalPrice: 19999,
        quantity: 1,
        ratings: 1012,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 10,
        tag: "hero-product",
        tagline: "Premium sound with extra bass.",
        heroImage: sony1000xm41,
        images: [sony1000xm41, sony1000xm42, sony1000xm43, sony1000xm44],
        brand: "Sony",
        title: "Sony WH-1000XM4",
        info: "Industry Leading Noise Cancelling Headphones",
        category: "Headphones",
        type: "Over Ear",
        connectivity: "Wireless",
        finalPrice: 29990,
        originalPrice: 34990,
        quantity: 1,
        ratings: 2154,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 11,
        tag: "featured-product",
        images: [boat255r1, boat255r2, boat255r3, boat255r4],
        brand: "boAt",
        title: "boAt Bassheads 255",
        info: "In-Ear Wired Earphones",
        category: "Earphones",
        type: "In Ear",
        connectivity: "Wired",
        finalPrice: 499,
        originalPrice: 1499,
        quantity: 1,
        ratings: 800,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 12,
        tag: "hero-product",
        tagline: "Stay active with style.",
        heroImage: boat2281,
        images: [boat2281, boat2282, boat2283, boat2284],
        brand: "boAt",
        title: "boAt Airdopes 228",
        info: "Wireless In-Ear Earbuds",
        category: "Earbuds",
        type: "In Ear",
        connectivity: "Wireless",
        finalPrice: 1999,
        originalPrice: 4990,
        quantity: 1,
        ratings: 1144,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 13,
        tag: "featured-product",
        images: [jblendurance1, jblendurance2, jblendurance3, jblendurance4],
        brand: "JBL",
        title: "JBL Endurance Run",
        info: "In-Ear Wired Sports Headphones",
        category: "Earphones",
        type: "In Ear",
        connectivity: "Wired",
        finalPrice: 799,
        originalPrice: 1999,
        quantity: 1,
        ratings: 672,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 14,
        tag: "hero-product",
        tagline: "Made for an active lifestyle.",
        heroImage: boat2031,
        images: [boat2031, boat2032, boat2033, boat2034],
        brand: "boAt",
        title: "boAt Airdopes 203",
        info: "Wireless In-Ear Earbuds",
        category: "Earbuds",
        type: "In Ear",
        connectivity: "Wireless",
        finalPrice: 2499,
        originalPrice: 3990,
        quantity: 1,
        ratings: 1102,
        rateCount: 5,
        path: "/product-details/",
    },
    {
        id: 15,
        tag: "featured-product",
        images: [sonych710n1, sonych710n2, sonych710n3, sonych710n4],
        brand: "Sony",
        title: "Sony WH-CH710N",
        info: "Wireless Noise Cancelling Headphones",
        category: "Headphones",
        type: "Over Ear",
        connectivity: "Wireless",
        finalPrice: 10999,
        originalPrice: 14999,
        quantity: 1,
        ratings: 990,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 16,
        tag: "hero-product",
        tagline: "Music that moves with you.",
        heroImage: jbl500bt1,
        images: [jbl500bt1, jbl500bt2, jbl500bt3, jbl500bt4],
        brand: "JBL",
        title: "JBL Tune 500BT",
        info: "Wireless On-Ear Headphones",
        category: "Headphones",
        type: "On Ear",
        connectivity: "Wireless",
        finalPrice: 3999,
        originalPrice: 5999,
        quantity: 1,
        ratings: 825,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 17,
        tag: "featured-product",
        images: [boat3811, boat3812, boat3813, boat3814],
        brand: "boAt",
        title: "boAt Rockerz 381",
        info: "Wireless On-Ear Headphones",
        category: "Headphones",
        type: "On Ear",
        connectivity: "Wireless",
        finalPrice: 2999,
        originalPrice: 4990,
        quantity: 1,
        ratings: 900,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 18,
        tag: "hero-product",
        tagline: "The ultimate in sound quality.",
        heroImage: sonyex14ap1,
        images: [sonyex14ap1, sonyex14ap2, sonyex14ap3, sonyex14ap4],
        brand: "Sony",
        title: "Sony EX14AP",
        info: "In-Ear Wired Earphones",
        category: "Earphones",
        type: "In Ear",
        connectivity: "Wired",
        finalPrice: 799,
        originalPrice: 1499,
        quantity: 1,
        ratings: 680,
        rateCount: 4,
        path: "/product-details/",
    },
    {
        id: 19,
        tag: "featured-product",
        images: [sonyxb4001, sonyxb4002, sonyxb4003, sonyxb4004],
        brand: "Sony",
        title: "Sony WI-XB400",
        info: "Extra Bass Wireless In-Ear Headphones",
        category: "Earphones",
        type: "In Ear",
        connectivity: "Wireless",
        finalPrice: 2990,
        originalPrice: 4990,
        quantity: 1,
        ratings: 1043,
        rateCount: 5,
        path: "/product-details/",
    },
];

export default productsData;
