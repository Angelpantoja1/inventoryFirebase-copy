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

let collection;
let selectedItem = "Shirts";
let injectTable;
let tableTitle

let selectedCollection = document.getElementById("selectedCollection")
let addItem = document.getElementById("addAnItem");
let injectForm = document.getElementById("injectForm");
selectedCollection.addEventListener("change", ({ target } = e) => {
    let { value } = target;
    selectedItem = value
    buildTable(value)
})
addItem.addEventListener("click", () => {
    buildForm(selectedItem)
    selectedCollection.classList.add("d-none")
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
    tableTitle = document.getElementById("title");
    injectTable = document.getElementById("injectTable");

    injectTable.innerHTML = "";
    tableTitle.textContent = collectionToGet == "SweatShirts" ? "Sweatshirts" : collectionToGet;

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
    thHeadTxtprops.forEach(headItem => {
        let th = elementCreator("th");
        th.setAttribute("scope", "col")
        th.textContent = headItem;
        trHead.appendChild(th);
    })

    let tBody = elementCreator("tbody")

    itemsArr.forEach((x, idx) => {
        let tr = elementCreator("tr")
        x.map((_, i) => {
            let td = elementCreator("td");
            td.textContent = itemsArr[idx].sort()[i][1];
            tr.appendChild(td)
        })
        tBody.appendChild(tr)
    })
    tHead.appendChild(trHead);
    Table.appendChild(tBody);
    Table.appendChild(tHead);
    injectTable.appendChild(Table)
}


function buildForm(test) {
    injectTable.innerHTML = "";
    tableTitle.classList.add("d-none");
    addItem.classList.add("d-none");
    let formConfig = {
        "Shirts": {
            arr: ["Size", "Brand", "Color", "Type", "Material", "Condition", "Logo", "Buttons"],
            title: "Shirts",
            obj: {
                Brand: "",
                Buttons: "",
                Color: "",
                Condition: "",
                Logo: "",
                Material: "",
                Size: "",
                Type: "",
            }
        },
        "Bottoms": {
            arr: ["Size", "Brand", "Color", "Type", "Material", "Wearability", "Price"],
            title: "Bottoms",
            obj: {
                Brand: "",
                Color: "",
                Material: "",
                Price: "",
                Size: "",
                Type: "",
                Wearability: "",
            }
        },
        "Shoes": {
            arr: ["Size", "Brand", "Color", "Type", "Logo", "Laces", "Condition", "Wearability"],
            title: "Shoes",
            obj: {
                Brand: "",
                Color: "",
                Condition: "",
                Laces: "",
                Logo: "",
                Size: "",
                Type: "",
                Wearability: "",
            }
        },
        "Hats": {
            arr: ["Size", "Brand", "Color", "Logo"],
            title: "Hats",
            obj: {
                Brand: "",
                Color: "",
                Logo: "",
                Size: "",
            }
        },
        "Jackets": {
            arr: ["Size", "Season", "Color", "Type", "Material", "Weight"],
            title: "Jackets",
            obj: {
                Color: "",
                Material: "",
                Season: "",
                Size: "",
                Weight: "",
            }
        },
        "SweatShirts": {
            arr: ["Type", "Brand", "Color", "Logo"],
            title: "Sweatshirts",
            obj: {
                Brand: "",
                Color: "",
                Logo: "",
                Type: "",
            }
        },
        "Perfumes": {
            arr: ["Type", "Brand", "Size", "Origin"],
            title: "Perfumes",
            obj: {
                Brand: "",
                Origin: "",
                Size: "",
                Type: "",
            }
        },
        "Bags": {
            arr: ["Type", "Brand", "Color", "Logo"],
            title: "Bags",
            obj: {
                Brand: "",
                Color: "",
                Logo: "",
                Type: "",
            }
        },
        "Blankets": {
            arr: ["Material", "Brand", "Color", "Logo"],
            title: "Blankets",
            obj: {
                Brand: "",
                Color: "",
                Logo: "",
                Material: "",
            }
        }
    }
    let { arr, title, obj } = formConfig[`${test}`]
    injectForm.innerHTML = "";
    injectForm.classList = "pt-3"

    let headerDiv = elementCreator("div")
    headerDiv.classList = "mb-3"

    let header = elementCreator("h1");
    header.textContent = title;

    headerDiv.appendChild(header);
    injectForm.appendChild(headerDiv)
    let number = 0;
    arr.sort().forEach(element => {
        let div = elementCreator("div");
        div.classList = "mb-3";

        let label = elementCreator("label");
        label.classList = "form-label";
        label.textContent = element

        let input = elementCreator("input");
        input.classList = "form-control"
        input.setAttribute("type", "text");
        input.setAttribute("id", arr.sort()[number++]);

        input.addEventListener("keypress", ( e) => {

            setTimeout(() => {
                console.log(e.target.value)
                obj[`${e.target.id}`] = e.target.value;
            }, 1);

        })
        div.appendChild(label);
        div.appendChild(input);
        injectForm.appendChild(div)
    });
    let addbtn = elementCreator("button")
    addbtn.classList = "btn btn-primary";
    addbtn.innerText = "Add";
    addbtn.addEventListener("click", function () {
        addItemtoColleections(obj)
        injectForm.innerHTML = "";
        buildTable(selectedItem);
        tableTitle.classList.remove("d-none");
        addItem.classList.remove("d-none");
        selectedCollection.classList.remove("d-none")
    })
    injectForm.appendChild(addbtn)
    let cancelbtn = elementCreator("button")
    cancelbtn.classList = "btn btn-warning";
    cancelbtn.innerText = "Cancel";
    cancelbtn.addEventListener("click", function () {
        injectForm.innerHTML = "";
        buildTable(selectedItem);
        tableTitle.classList.remove("d-none");
        addItem.classList.remove("d-none");
        selectedCollection.classList.remove("d-none")
    })
    injectForm.appendChild(cancelbtn)
}
buildTable("Shirts");