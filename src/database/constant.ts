import * as passwordHash from 'password-hash'

const genarateHashPassword = (password: String) => {
    let passwordHashReturn = passwordHash.generate(password)
    return passwordHashReturn
}


export const USER_ARRAY = [{
    name: "Đức Anh",
    email: "zjnkill18@gmail.com",
    password: genarateHashPassword("nho812005"),
    phoneNumber: "0984627906",
    role: "ADMIN",
    avatar: "avatar-user.png"
}, {
    name: "Tôi là Admin",
    email: "admin@gmail.com",
    password: genarateHashPassword("123456"),
    phoneNumber: "0123456789",
    role: "ADMIN",
    avatar: "avatar-user.png"
}, {
    name: "Tôi là User",
    email: "user@gmail.com",
    password: genarateHashPassword("123456"),
    phoneNumber: "09876543321",
    role: "USER",
    avatar: "avatar-user.png"
}]

export const DISCOUNT_ARRAY = [{
    codeSeller: "DISCOUNT15k",
    title: "MÃ GIẢM GIÁ 15K",
    description: "Áp Dụng Cho Đơn Hàng Có Giá Trị 200k",
    category: "deals",
    discount: "15000",
    priceApplicable: 150000
},
{
    codeSeller: "DISCOUNT25k",
    title: "MÃ GIẢM GIÁ 25K",
    description: "Áp Dụng Cho Đơn Hàng Có Giá Trị 350k",
    category: "deals",
    discount: "25000",
    priceApplicable: 350000
}, {
    codeSeller: "DISCOUNT15k",
    title: "MÃ GIẢM GIÁ 45K",
    description: "Áp Dụng Cho Đơn Hàng Có Giá Trị 500k",
    category: "deals",
    discount: "45000",
    priceApplicable: 500000
}]

export const PRODUCT_ARRAY = [
    {
        mainText: "Gà Buộc Lễ Cánh Tiên Cho Ngày Cúng (Có Kèm Xôi)",
        author: "SQFood",
        category: "cook",
        type: "boil",
        price: 295000,
        percentSale: 20,
        sold: 4,
        thumbnail: "ga1.jpeg",
        slider: ["ga1.jpeg", "ga2.jpeg", "ga3.jpeg", "ga4.jpeg"]

    },
    {
        mainText: "Gà Đông Cảo Luộc - Nước Chấm Thần Thánh (nửa con)",
        author: "SQFood",
        category: "cook",
        type: "boil",
        price: 252000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook1.1.jpeg",
        slider: ["cook1.1.jpeg", "cook1.2.jpeg"]

    },
    {
        mainText: "Ngan Luộc - Nước Chấm Thần Thánh (nửa con)",
        author: "SQFood",
        category: "cook",
        type: "boil",
        price: 140000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook2.2.jpeg",
        slider: ["cook2.1.jpeg", "cook2.2.jpeg", "cook2.3.jpeg"]

    },
    {
        mainText: "Vịt Luộc - Nước Chấm Thần Thánh (nửa con)",
        author: "SQFood",
        category: "cook",
        type: "boil",
        price: 170000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook3.1.jpeg",
        slider: ["cook3.1.jpeg", "cook3.2.jpeg", "cook3.3.jpeg"]

    },
    {
        mainText: "Thịt Lợn Luộc - Nước Chấm Thần Thánh (500g)",
        author: "SQFood",
        category: "cook",
        type: "boil",
        price: 140000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook4.1.jpeg",
        slider: ["cook4.1.jpeg", "cook4.2.jpeg", "cook4.3.jpeg"]

    }
    ,
    //fried
    {
        mainText: "Cánh Gà Rang Muối (Dai) ",
        author: "SQFood",
        category: "cook",
        type: "fried",
        price: 105000,
        percentSale: 20,
        sold: 40,
        thumbnail: "cook_fried1.1.jpeg",
        slider: ["cook_fried1.1.jpeg", "cook_fried1.2.jpeg", "cook_fried1.3.webp"]

    },
    {
        mainText: "Đùi Gà Rang Muối (Mềm)",
        author: "SQFood",
        category: "cook",
        type: "fried",
        price: 92000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_fried2.1.jpeg",
        slider: ["cook_fried2.1.jpeg", "cook_fried2.2.webp", "cook_fried2.3.jpeg"]

    },
    {
        mainText: "Thịt Heo Quay Chiên Nước Mắm Giòn (500g)",
        author: "SQFood",
        category: "cook",
        type: "fried",
        price: 140000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_fried3.1.webp",
        slider: ["cook_fried3.1.webp", "cook_fried3.2.jpeg", "cook_fried3.3.jpeg"]

    },
    {
        mainText: "Thịt Heo Chiên Xù TONKATSU Nhật Bản",
        author: "SQFood",
        category: "cook",
        type: "fried",
        price: 170000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_fried4.1.jpeg",
        slider: ["cook_fried4.1.jpeg", "cook_fried4.2.jpeg"]

    },
    {
        mainText: "Cánh Gà Chiên Xù Thơm Dai",
        author: "SQFood",
        category: "cook",
        type: "fried",
        price: 110000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_fried5.1.jpeg",
        slider: ["cook_fried5.1.jpeg", "cook_fried5.2.jpeg", "cook_fried5.3.png"]

    },
    {
        mainText: "Cánh Gà Chiên Nước Mắm Da Giòn Thịt Thấm Không Bị Khô",
        author: "SQFood",
        category: "cook",
        type: "fried",
        price: 110000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_fried6.1.jpeg",
        slider: ["cook_fried6.1.jpeg", "cook_fried6.2.jpeg", "cook_fried6.3.png"]

    },

    //ingredient
    {
        mainText: "Gà Ri Nguyên Con Thả Vườn",
        author: "SQFood",
        category: "ingredient",
        type: "chicken",
        price: 105000,
        percentSale: 20,
        sold: 40,
        thumbnail: "ingredient_chicken1.2.jpeg",
        slider: ["ingredient_chicken1.1.jpeg", "ingredient_chicken1.2.jpeg", "ingredient_chicken1.3.jpeg"]

    },
    {
        mainText: "Gà Ác Nguyên Con Thả Vườn",
        author: "SQFood",
        category: "ingredient",
        type: "chicken",
        price: 92000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_chicken2.1.jpg",
        slider: ["ingredient_chicken2.1.jpg", "ingredient_chicken2.2.jpg", "ingredient_chicken2.3.jpg"]

    },
    {
        mainText: "Ức Gà Công Nghiệp (500g)",
        author: "SQFood",
        category: "ingredient",
        type: "chicken",
        price: 50000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_chicken3.1.jpg",
        slider: ["ingredient_chicken3.1.jpg", "ingredient_chicken3.2.jpg", "ingredient_chicken3.3.jpg"]

    },
    {
        mainText: "Ngọc Kê Gà Đông Tảo ",
        author: "SQFood",
        category: "ingredient",
        type: "chicken",
        price: 170000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_chicken4.1.jpg",
        slider: ["ingredient_chicken4.1.jpg", "ingredient_chicken4.2.jpg", "ingredient_chicken4.3.jpg"]

    },
    {
        mainText: "Đùi Gà Công Nghiêp (500g)",
        author: "SQFood",
        category: "ingredient",
        type: "chicken",
        price: 45000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_chicken5.1.jpg",
        slider: ["ingredient_chicken5.1.jpg", "ingredient_chicken5.2.jpg", "ingredient_chicken5.3.jpg"]

    },

    //duck
    {
        mainText: "Vịt Bầu Cánh Trắng Nguyên Con (Đã Làm Sạch)",
        author: "SQFood",
        category: "ingredient",
        type: "duck",
        price: 105000,
        percentSale: 20,
        sold: 40,
        thumbnail: "cook_ingredient_duck1.2.jpeg",
        slider: ["cook_ingredient_duck1.2.jpeg", "cook_ingredient_duck1.1.jpeg", "cook_ingredient_duck1.3.jpeg"]

    },
    {
        mainText: "Vịt Super - Siêu Thịt (Đã Làm Sạch)",
        author: "SQFood",
        category: "ingredient",
        type: "duck",
        price: 92000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_ingredient_duck2.1.jpeg",
        slider: ["cook_ingredient_duck2.1.jpeg", "cook_ingredient_duck2.2.webp", "cook_ingredient_duck2.3.jpeg", "cook_ingredient_duck2.4.jpeg"]

    },
    {
        mainText: "Ngan Đen Nguyên Con (Đã Làm Sạch)",
        author: "SQFood",
        category: "ingredient",
        type: "duck",
        price: 50000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_ingredient_duck3.1.jpeg",
        slider: ["cook_ingredient_duck3.1.jpeg", "cook_ingredient_duck3.2.jpeg", "cook_ingredient_duck3.3.jpeg"]

    },
    {
        mainText: "Chân Vịt Rút Xương Tứ Xuyên (1kg)",
        author: "SQFood",
        category: "ingredient",
        type: "duck",
        price: 70000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_ingredient_duck4.1.jpeg",
        slider: ["cook_ingredient_duck4.1.jpeg", "cook_ingredient_duck4.3.jpeg", "cook_ingredient_duck4.2.jpeg"]

    },
    {
        mainText: "Đùi Vịt Công Nghiêp (500g)",
        author: "SQFood",
        category: "ingredient",
        type: "duck",
        price: 45000,
        percentSale: 20,
        sold: 20,
        thumbnail: "cook_ingredient_duck5.1.webp",
        slider: ["cook_ingredient_duck5.1.webp", "cook_ingredient_duck5.2.webp"]

    },

    //cow
    {
        mainText: "Sườn Bò Dày Thịt (Đã chặt)",
        author: "SQFood",
        category: "ingredient",
        type: "cow",
        price: 105000,
        percentSale: 20,
        sold: 40,
        thumbnail: "ingredient_cow1.1.jpeg",
        slider: ["ingredient_cow1.1.jpeg", "ingredient_cow1.2.jpeg", "ingredient_cow1.3.jpeg"]

    },
    {
        mainText: "Dẻ Sườn Bò Nhiều Thịt",
        author: "SQFood",
        category: "ingredient",
        type: "cow",
        price: 92000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_cow2.1.jpeg",
        slider: ["ingredient_cow2.1.jpeg", "ingredient_cow2.2.png", "ingredient_cow2.3.jpeg"]

    },
    {
        mainText: "Bắp Bò Nguyên Tảng (3kg)",
        author: "SQFood",
        category: "ingredient",
        type: "cow",
        price: 50000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_cow3.1.jpeg",
        slider: ["ingredient_cow3.1.jpeg", "ingredient_cow3.2.png", "ingredient_cow3.3.jpeg"]

    },
    {
        mainText: "Đuôi Bò Tươi (Đã chặt) - 1kg",
        author: "SQFood",
        category: "ingredient",
        type: "cow",
        price: 170000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_cow4.1.jpeg",
        slider: ["ingredient_cow4.1.jpeg", "ingredient_cow4.2.png", "ingredient_cow4.3.jpeg"]

    },
    {
        mainText: "Lõi Hoa Bắp Bò Dày Thịt",
        author: "SQFood",
        category: "ingredient",
        type: "cow",
        price: 45000,
        percentSale: 20,
        sold: 20,
        thumbnail: "ingredient_cow5.1.jpeg",
        slider: ["ingredient_cow5.1.jpeg", "ingredient_cow5.2.png", "ingredient_cow5.3.jpeg"]

    },

]
