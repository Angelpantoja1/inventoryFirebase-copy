const firebaseConfig = {
    apiKey: "AIzaSyByCqBDhEIHEJP_Z5v0EtBSul-6iWWexCs",
    authDomain: "fir-inventory-9f5b2.firebaseapp.com",
    projectId: "fir-inventory-9f5b2",
    storageBucket: "fir-inventory-9f5b2.appspot.com",
    messagingSenderId: "892019302714",
    appId: "1:892019302714:web:3e3f1c68f6ea45b73c7003"
}

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

let brand = document.getElementById("brand")
let buttons = document.getElementById("buttons")
let color = document.getElementById("color")
let condition = document.getElementById("condition")
let logo = document.getElementById("logo")
let material = document.getElementById("material")
let size = document.getElementById("size")
let type = document.getElementById("type")
// ---------SHOES ---------------------//
let shoesBrand = document.getElementById("shoesBrand")
let shoesColor = document.getElementById("shoesColor")
let shoesCondition = document.getElementById("shoesCondition")
let shoesLaces = document.getElementById("shoesLaces")
let shoesLogo = document.getElementById("shoesLogo")
let shoesSize = document.getElementById("shoesSize")
let shoesType = document.getElementById("shoesType")
let shoesWearability = document.getElementById("shoesWearability")
//-------------FORMS----------------------//
let shirtForm = document.getElementById("shirtForm")
let shoesForm = document.getElementById("shoesForm")

let cancelBtn = document.getElementById("cancelBtn")
let selectedCollection = document.getElementById("selectedCollection")

let collection;
let selectedItem = "Shirts";

selectedCollection.addEventListener("change", ({ target } = e) => {
    let { value } = target;;
    selectedItem = value
    buildTable(value)
})
document.getElementById("addAnItem").addEventListener("click", () => {

    selectedItem == "Shirts" ? magic(selectedItem, shirtForm, shoesForm) : magic(selectedItem, shoesForm, shirtForm)
})

function magic(collectionToGet, remove, add) {
    collection = db.collection(collectionToGet);
    remove.classList.remove("d-none");
    add.classList.add("d-none");
    selectedCollection.classList.add("d-none");
    cancelBtn.classList.remove("d-none")
}
cancelBtn.addEventListener("click", () => {
    [shoesBrand,
        shoesBrand,
        shoesCondition,
        shoesLaces,
        shoesLogo,
        shoesSize,
        shoesType,
        shoesWearability,
        brand,
        buttons,
        color,
        condition,
        logo,
        material,
        size,
        type].map(x => x.value = "")
    shirtForm.classList.add("d-none");
    shoesForm.classList.add("d-none");
    cancelBtn.classList.add("d-none");
    selectedCollection.classList.remove("d-none");
})

document.getElementById("addShoesItem").addEventListener('click', () => {
    addItemtoColleections({
        Brand: shoesBrand.value,
        Color: shoesBrand.value,
        Condition: shoesCondition.value,
        Laces: shoesLaces.value,
        Logo: shoesLogo.value,
        Size: shoesSize.value,
        Type: shoesType.value,
        Wearability: shoesWearability.value,
    })
    shoesForm.classList.add("d-none");
    selectedCollection.classList.remove("d-none");
    cancelBtn.classList.add("d-none");
})

document.getElementById("addItem").addEventListener('click', () => {
    addItemtoColleections({
        Brand: brand.value,
        Buttons: buttons.value,
        Color: color.value,
        Condition: condition.value,
        Logo: logo.value,
        Material: material.value,
        Size: size.value,
        Type: type.value,
    })
    shirtForm.classList.add("d-none");
    selectedCollection.classList.remove("d-none");
    cancelBtn.classList.add("d-none");
})

function addItemtoColleections(items) {
    collection.add(items)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            buildTable(selectedItem)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function elementCreator(element) {
    return document.createElement(element)
}

async function buildTable(collectionToGet) {
    let title = document.getElementById("title");
    let injectTable = document.getElementById("injectTable");

    injectTable.innerHTML = "";
    title.textContent = collectionToGet;

    let data = []
    collection = db.collection(collectionToGet);
    await collection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
    });

    let Table = elementCreator("Table");
    Table.classList.add("table");

    let tHead = elementCreator("thead");
    let trHead = elementCreator("tr");

    let itemsArr = await data.map(obj => Object.entries(obj).map(x => x))
    let thHeadTxtprops = itemsArr[0].map(headTxt => headTxt[0]).sort()
    console.log(itemsArr);
    thHeadTxtprops.forEach(headItem => {
        let th = elementCreator("th");
        th.setAttribute("scope", "col")
        th.textContent = headItem;
        trHead.appendChild(th);
    })

    let tBody = elementCreator("tbody")

    itemsArr.forEach((x, idx) => {
        let tr = elementCreator("tr")
        console.log(idx)
        x.map((_, i) => {
            let td = elementCreator("td");
            td.textContent = itemsArr[idx].sort()[i][1];
            tr.appendChild(td)
        })
        tBody.appendChild(tr)
    })
    console.log(tBody)

    tHead.appendChild(trHead);
    Table.appendChild(tBody);
    Table.appendChild(tHead);
    injectTable.appendChild(Table)
}
buildTable("Shirts");

let shirtArr = ["Size", "Brand", "Color", "Type", "Material", "Condition", "Logo", "Buttons"],
    bottomArr = ["Size", "Brand", "Color", "Type", "Material", "Wearability", "Price"],
    shoesArr = ["Size", "Brand", "Color", "Type", "Logo", "Laces", "Condition", "Wearability"],
    HatsArr = ["Size", "Brand", "Color", "Logo"],
    JacketsArr = ["Size", "Season", "Color", "Type", "Material", "Weight"],
    sweatshirtArr = ["Type", "Brand", "Color", "Logo"],
    perfumeArr = ["Type", "Brand", "Size", "Origin", "logo"],
    bagArr = ["Type", "Brand", "Color", "Logo"],
    blalnketArr = ["Material", "Brand", "Color", "Logo"];
let injectForm = document.getElementById("injectForm");

function buildForm(arrr, title) {
    injectForm.innerHTML = "";
    injectForm.classList = "pt-3"

    let headerDiv = elementCreator("div")
    headerDiv.classList = "mb-3"

    let header = elementCreator("h1");
    header.textContent = title;

    headerDiv.appendChild(header);
    injectForm.appendChild(headerDiv)
    arrr.sort().forEach(element => {
        let div = elementCreator("div");
        div.classList = "mb-3";

        let label = elementCreator("label");
        label.classList = "form-label";
        label.textContent = element

        let input = elementCreator("input");
        input.classList = "form-control"
        input.setAttribute("type", "text");
        input.addEventListener("keypress", ({ target: { value } = value } = e) => {
            console.log(value)
        })
        div.appendChild(label);
        div.appendChild(input);
        injectForm.appendChild(div)
    });
}
// buildForm(shirtArr, "Shirts")