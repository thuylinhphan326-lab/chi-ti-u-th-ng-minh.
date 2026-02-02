function formatMoney(num) {
    return num.toLocaleString("vi-VN") + " VNĐ";
}

function roundThousand(n) {
    return Math.floor(n / 1000) * 1000;
}

function generatePlan() {
    let income = Number(document.getElementById("income").value);
    let age = Number(document.getElementById("age").value);
    let group = document.getElementById("group").value;

    if (!income || !age) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let plan = getPlan(group, income);

    document.getElementById("result").innerHTML = plan;
}

function getPlan(group, income) {
    let categories = {};

    // -------------------------
    // TỶ LỆ TÙY ĐỐI TƯỢNG
    // -------------------------
    if (group === "student") {
        categories = {
            "Ăn uống – đi lại": 0.35,
            "Học tập – dụng cụ": 0.25,
            "Giải trí – bạn bè": 0.20,
            "Tiết kiệm": 0.20
        };

    } else if (group === "college") {
        categories = {
            "Thuê trọ": 0.32,
            "Ăn uống": 0.28,
            "Học tập": 0.18,
            "Giao lưu – giải trí": 0.12,
            "Tiết kiệm": 0.10
        };

    } else if (group === "worker") {
        categories = {
            "Tiền nhà/Phụ giúp gia đình": 0.30,
            "Ăn uống – đi lại": 0.25,
            "Giao lưu công việc": 0.15,
            "Mua sắm cá nhân": 0.15,
            "Tiết kiệm – đầu tư": 0.15
        };

    } else if (group === "housewife") {
        categories = {
            "Chợ – ăn uống": 0.40,
            "Tiền nhà – điện nước": 0.25,
            "Con cái – học tập": 0.20,
            "Đồ dùng gia đình": 0.10,
            "Tiết kiệm": 0.05
        };

    } else if (group === "elder") {
        categories = {
            "Sức khỏe – thuốc men": 0.40,
            "Ăn uống": 0.25,
            "Giải trí – giao lưu": 0.15,
            "Tiết kiệm – dự phòng": 0.10,
            "Quà cháu chắt": 0.10
        };
    }

    let html = "";

    for (let [name, percent] of Object.entries(categories)) {

        let total = roundThousand(income * percent);

        html += `
            <div class="card">
                <h2>${name} — ${formatMoney(total)}</h2>
                <ul>
                    ${genSubItems(name, total).join("")}
                </ul>
            </div>
        `;
    }

    return html;
}

function genSubItems(category, total) {
    let ratio = {};

    if (category.includes("Ăn uống")) {
        ratio = {
            "Bữa chính": 0.60,
            "Ăn vặt/đi uống nước": 0.25,
            "Dự phòng tăng giá": 0.15
        };

    } else if (category.includes("Học")) {
        ratio = {
            "Sách vở": 0.40,
            "Dụng cụ học tập": 0.35,
            "Tài liệu thêm": 0.25
        };

    } else if (category.includes("Sức khỏe")) {
        ratio = {
            "Thuốc men": 0.50,
            "Khám định kỳ": 0.30,
            "Dự phòng": 0.20
        };

    } else {
        ratio = {
            "Mục 1": 0.40,
            "Mục 2": 0.35,
            "Mục 3": 0.25
        };
    }

    let list = [];

    for (let [sub, r] of Object.entries(ratio)) {
        let val = roundThousand(total * r);
        list.push(`<li>${sub}: <b>${formatMoney(val)}</b></li>`);
    }

    return list;
}
