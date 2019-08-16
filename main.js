"use strict"
// PROJECT: HACKED CELEBRATION: +300 Version 2.0 - custom-made bagde
// CODE WRITTEN BY: Luis Febro
//GOAL: Celebrate new badge making mention of main warriors who fought with me in the hall of fame and show reports on it.
// DATE OF LAUNCH: 07/17/19

//PENDING ISSUES/CODES TO SOLVE/ADD:
// add error handling for profile pics.profile (done)

// //POLYFILLERS (for older browsers)
// //Object.entries
// //SOURCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill
if (!Object.entries) {
    Object.entries = function(obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
}

// Object.defineProperties()
// SOURCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
function defineProperties(obj, properties) {
    function convertToDescriptor(desc) {
        function hasProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        function isCallable(v) {
            // NB: modify as necessary if other values than functions are callable.
            return typeof v === 'function';
        }

        if (typeof desc !== 'object' || desc === null)
            throw new TypeError('bad desc');

        var d = {};

        if (hasProperty(desc, 'enumerable'))
            d.enumerable = !!desc.enumerable;
        if (hasProperty(desc, 'configurable'))
            d.configurable = !!desc.configurable;
        if (hasProperty(desc, 'value'))
            d.value = desc.value;
        if (hasProperty(desc, 'writable'))
            d.writable = !!desc.writable;
        if (hasProperty(desc, 'get')) {
            var g = desc.get;

            if (!isCallable(g) && typeof g !== 'undefined')
                throw new TypeError('bad get');
            d.get = g;
        }
        if (hasProperty(desc, 'set')) {
            var s = desc.set;
            if (!isCallable(s) && typeof s !== 'undefined')
                throw new TypeError('bad set');
            d.set = s;
        }

        if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d))
            throw new TypeError('identity-confused descriptor');

        return d;
    }

    if (typeof obj !== 'object' || obj === null)
        throw new TypeError('bad obj');

    properties = Object(properties);

    var keys = Object.keys(properties);
    var descs = [];

    for (var i = 0; i < keys.length; i++)
        descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);

    for (var i = 0; i < descs.length; i++)
        Object.defineProperty(obj, descs[i][0], descs[i][1]);

    return obj;
}
// POLYFILLERS - END


//DATA HANDLING
var coreData = {}; //n2
coreData.allNames = getData()[0];
coreData.allImgIds = getData()[1];
coreData.allImages = getData()[2];
coreData.currClickedWarrior = null;

function getData() {
    let names = [],
        imgIds = [],
        imgGallery = [],
        picIds = { //n5
            //Front battle warriors list (=
            "$hardul B": 5742610, //mS
            "Abdoulrazak": 6818433,
            "Aghogho": 2477887,
            "Airree": 12911956, //mS
            "Ajith K.": 11154771, //mS
            "Aleks": 6590814,
            "Aleksandra": 13643620, //mS
            "Alexander K.": 8948591,
            "Ana D.": 8091198, //mP
            "Andrei O.": 12735046,
            "Arjun": 14669031,
            "Armine M.": 9938769,
            "Atlas H.": 12272000, //mP
            "Bahram I.": 12839411, //mS
            "Basel AI": 7474490, //mS
            "BasiaCode": 2573815, //mS
            "Bastien": 13186717, //mG
            "BendoFlex": 14792504, //mS
            "Betsy R.": 10574466,
            "Black Tigress": 12221736, //mS
            "Blackwinter": 1123272,
            "Brahmeswara": 6815286, //mGP
            "Codeomani.": 5858561, //mS
            "Daniel R.": 8598564, //mGP
            "Dawid": 9623678,
            "Denis R.": 11161872, //mG
            "Diego Code": 11861907, //mS
            "Duru R.": 13362139,
            "Ekaterina": 13934656, //mP
            "Elena S.": 68417, //mP
            "Elena": 4905960,
            "Eric W.": 4577878,
            "Fedir A.": 12041611,
            "Fehnhy": 11605280, //mP
            "Gabriel H.": 1337067,
            "George S.": 9054422, //mG
            "Helen H.": 14594553, //mG
            "Igor P.": 3391579, //mS
            "Irene": 13481342, //mS
            "Ivan M.": 12937059,
            "Jelena": 14384723, //mG
            "Jeremy C.": 10450263,
            "Julian K.": 4734911,
            "JulieBrase": 11078218, //mG
            "Kae": 8001152,
            "Lady_A.": 11726680,
            "Lavinia": 9774662,
            "Levani B.": 14673243,
            "Luciene B.": 6823849,
            "Lusi": 14011628, //mS
            "Marcos": 13722341, //mG
            "Mark G": 8154418, //mS
            "Matteo F.": 545286,
            "Meisam A.": 423209, //mS
            "Mike G.": 14566018,
            "Mofey": 9035353, //mG
            "Muhamad Z.": 14801254, //mS
            "Nixon B.": 4283120,
            "Odiesta S.": 6486736,
            "Oleg Olov": 12701879,
            "Omara_A.": 8059064,
            "Ortal S.": 6207294,
            "Pawan K.": 2392843,
            "Petta": 9860368, //mS
            "Prometheus": 2200299, //mGP
            "Qasem": 11527703, //mS
            "Radu H.": 14101549,
            "Sayali D.": 11309375, //mS
            "Sharof G.": 10487123, //mG
            "Shimon G.": 10267810,
            "Shiven S.": 14445192,
            "Tahir U.": 3756691, //mS
            "Tamara A.": 322681, //mS
            "Tatsuaki K.": 10561226,
            "Thanigai V.": 12360726, //mSP
            "Tony": 10082076, //mSP
            "Tree": 11660797,
            "Uni": 8412719, //mG
            "Valentina": 13866851,
            "Vasilis K.": 12062895,
            "Viktor T.": 5291419, //mS
            "Vivek R.": 12144319, //mS
            "Vivek T.": 12992003, //mS
            "Wild_Wolf": 13372870,
            "Wongalethu": 1231853, //mSP
            "Zireael7": 13665439,
            "Παναγιώτης": 9733612,
            "Анна": 13108823, //mG
            "Дмитро М": 4972638,
            "Леонора К.": 4844109, //mSP
            "‎حسين مزهر‎": 8708271,
            "서혜연": 11484844,
        };

    for (let selected in picIds) {
        let newImage = `https://api.sololearn.com/Uploads/Avatars/${picIds[selected]}.jpg`,
            newName = selected,
            newId = picIds[selected];

        names.push(newName);
        imgIds.push(newId);
        imgGallery.push(newImage);
    }

    return [names, imgIds, imgGallery, picIds];

}

var challengeTrophies = { //n6
    "Max Silver": {
        desc: "1x multi storm (+3 challenges)",
        trophyImg: "https://imgur.com/RCIY0MZ.png",
        warriors: ["$hardul B", "Airree", "Aleksandra", "Bahram I.", "Basel AI", "BasiaCode", "Codeomani.", "Black Tigress", "Diego Code", "Igor P.", "Irene", "Qasem", "Mark G", "Meisam A.", "Tahir U.", "Viktor T.", "Vivek T.", "Sayali D.", "Ajith K.", "Muhamad Z.", "Tamara A.", "BendoFlex", "Lusi", "Petta"]
    },
    "Max Silver Plus": {
        desc: "2x multi storm (+3 challenges each)",
        trophyImg: "https://imgur.com/qEIWUBV.png",
        warriors: ["Thanigai V.", "Tony", "Wongalethu", "Леонора К."]
    },
    "Max Gold": {
        desc: "1x full storm (+12 challenges)",
        trophyImg: "https://imgur.com/5a9bYhD.png",
        warriors: ["Bastien", "Denis R.", "George S.", "Helen H.", "Jelena", "JulieBrase", "Marcos", "Mofey", "Sharof G.", "Prometheus", "Uni", "Анна"]
    },
    "Max Gold Plus": {
        desc: "1x multi storm and 1x full storm",
        trophyImg: "https://imgur.com/8l6cK5X.png", //
        warriors: ["Brahmeswara", "Daniel R."]
    },
    "Max Platinum": {
        desc: "2x full storm",
        trophyImg: "https://imgur.com/B4Z8P0x.png",
        warriors: ["Ana D.", "Atlas H.", "Ekaterina", "Elena S.", "Fehnhy", ]
    },

    "Battle Medal": {
        desc: "For fighting up until 2 challenges"
    },

    findTitle: function(warrior) {
        let foundKeys = [];
        //For not include methods, only properties. Otherwise, error
        Object.defineProperties(this, {
            findTitle: {
                enumerable: false
            },
            "Battle Medal": {
                enumerable: false
            }
        });

        //Find title
        Object.entries(this).forEach(keysValues => {
            keysValues[1].warriors.forEach(currentElem => {
                try {
                    if (currentElem.toLowerCase() === warrior.toLowerCase()) {
                        foundKeys.push(keysValues[0]);
                    }
                } catch (err) {
                    // empty
                }
            });
        });

        if (foundKeys.length === 0) {
            foundKeys.push("Battle Medal");
        }

        return foundKeys[0];
    }
};

var fightDays = {
    warriorsDayOne: ["$hardul B", "Abdoulrazak", "Aghogho", "Airree", "Aleks", "Aleksandra", "Alexander K.", "Ana D.", "Andrei O.", "Arjun", "Armine M.", "Atlas H.", "Bahram I.", "Basel AI", "BasiaCode", "Bastien", "Betsy R.", "Black Tigress", "Blackwinter", "Brahmeswara", "Codeomani.", "Daniel R.", "Dawid", "Diego Code", "Duru R.", "Ekaterina", "Elena S.", "Elena", "Eric W.", "Fedir A.", "Fehnhy", "Gabriel H.", "George S.", "Helen H.", "Igor P.", "Irene", "Ivan M.", "Jelena", "Jeremy C.", "Julian K.", "Kae", "Lady_A.", "Lavinia", "Levani B.", "Luciene B.", "Mark G", "Matteo F.", "Meisam A.", "Mike G.", "Mofey", "Nixon B.", "Odiesta S.", "Oleg Olov", "Omara_A.", "Ortal S.", "Pawan K.", "Prometheus", "Qasem", "Radu H.", "Shiven S.", "Tahir U.", "Tatsuaki K.", "Thanigai V.", "Tony", "Tree", "Uni", "Valentina", "Vasilis K.", "Viktor T.", "Vivek T.", "Wild_Wolf", "Wongalethu", "Zireael7", "Παναγιώτης", "Анна", "Дмитро М", "Леонора К.", "‎حسين مزهر‎", "서혜연"],
    warriorsDayTwo: ["Prometheus", "Ekaterina", "Elena S.", "Jelena", "Ana D.", "Fernhy", "Vivek T.", "Atlas H.", "Brahmeswara", "Daniel R.", "Wongalethu", "Tony", "Thanigai V.", "Denis R.", "Sharof G.", "Vivek R.", "Sayali D.", "Marcos", "Shimon G.", "Ajith K.", "Muhamad Z.", "Tamara A.", "BendoFlex", "Lusi", "Petta", "JulieBrase"],

    getInfo: function(warrior) {
        var checkDayOne, checkDayTwo;
        //cross-browser code to support "includes method".
        try {
            checkDayOne = this.warriorsDayOne.includes(warrior);
            checkDayTwo = this.warriorsDayTwo.includes(warrior);
        } catch (err) {
            if (this.warriorsDayOne.indexOf(warrior) != -1) {
                checkDayOne = true;
            } else {
                checkDayTwo = true;
            }
        }

        if (checkDayOne && checkDayTwo === true) {
            return `${warrior} fought with Febro BOTH days!`;
        } else if (checkDayOne) {
            return `${warrior} fought with Febro on the FIRST day - 14th July`;
        } else if (checkDayTwo) {
            return `${warrior} fought with Febro on the SECOND day - 19th July`;
        } else {
            return "Oops! I forgot to include this warrior!";
        }
    }
};
//DATA HANDLING - END



//inserting Modal Box Listener for warrior's profile
function addListenerEachElement(targetElem, elemId, event) {
    targetElem.addEventListener(event, function() {
        getModalBox("#modalContainer_warriors", "#modalContent_warriors", "#closeButton_warriors", "#" + elemId);
        //force to top - not working
        // var parent = document.querySelector("#modalContainer_warriors"),
        //     childPos = document.querySelector(".modalTop").offsetTop;
        // parent.scrollTop = childPos; //Sol 1

    });
}

//Goal: get a message in the warrior card informing which position the current clicked one is listed according to SL register.
function getListOldestToNewest() {
    let targetWarrior = coreData.currClickedWarrior,
        targetWarriorId = getData()[3][targetWarrior],
        imgIdMinToMax = coreData.allImgIds.sort((a, b) => a - b),
        oldestWarrior = getKeyByValue(getData()[3], Math.min.apply(null, imgIdMinToMax)),
        newestWarrior = getKeyByValue(getData()[3], Math.max.apply(null, imgIdMinToMax)),
        pos = getAbbrEnglishNumbers(imgIdMinToMax.indexOf(targetWarriorId) + 1),
        message = "";

    function getAbbrEnglishNumbers(num) {
        num = num.toString();
        var lastNum = num[num.length - 1],
            posAbbr = { 0: `th`, 1: `st`, 2: `nd`, 3: `rd` };

        if (lastNum > 3) {
            num += "th";
        } else {
            for (let specialCase in posAbbr) {
                if (lastNum === specialCase) {
                    num += posAbbr[specialCase];
                }
            }
        }
        return num;
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    if (targetWarrior === oldestWarrior) {
        message = `Yeah! We found that <strong>${targetWarrior}</strong> is the oldest warrior - <strong>${pos}</strong> of this list`;
    } else if (targetWarrior === newestWarrior) {
        message = `Hold on! We found the newest warrior in the <strong>${pos}</strong> position: <strong>${targetWarrior}</strong>`;
    } else {
        message = `<strong>${targetWarrior}</strong> is rated in the <strong>${pos}</strong> from oldest to newest registered members in this SL battles Hall`;
    }

    return message;
}

//Goal: create an array and return a random number of index array.
function getRandomArray(arrLength) {
    arrLength--;
    var newRandomArray = [];

    var ind = 0;
    for (; ind <= arrLength; ind++) {
        newRandomArray.push(ind);
    }

    newRandomArray.sort(function(a, b) {
        return 0.5 - Math.random();
    });

    return newRandomArray;
}



var globalPreload = {}; //n2
globalPreload.index = 0;
globalPreload.load =
    setInterval(() => preloadImages(coreData.allImages), 1750);
globalPreload.ramdomInd = getRandomArray(coreData.allNames.length); //n3

function preloadImages(imgArr) {
    // Creating Elements
    var listWarriors = document.querySelector("#listWarriors"),
        newDiv = document.createElement("div"),
        newDivTrophy = document.createElement("div"),
        newName = document.createElement("p"),
        selectRandom = globalPreload.ramdomInd[globalPreload.index],
        img = new Image(),
        imgTrophy = new Image(),
        trophyTitle = challengeTrophies.findTitle(coreData.allNames[selectRandom]),
        loadingGallery = document.getElementById("loadingGallery"),
        galleryCounter = coreData.allNames.length - globalPreload.index;

    newDiv.className = "avatarContainer";
    newDiv.id = `warriorTrigger${globalPreload.index + 1}`;

    newName.innerHTML = coreData.allNames[selectRandom];
    newName.className = "nameWarrior";

    //image insertion handling
    img.style.cursor = "pointer";
    img.style.zIndex = "10";
    img.src = imgArr[selectRandom];
    img.addEventListener("error", function() {
        img.src = "https://drive.google.com/uc?export=download&id=1ThBODokPY3N46HT7GpNVhpgl0n2lwoWK";
        img.style.opacity = ".5";
    });
    img.className = `avatarDesign shadow`;
    newDiv.addEventListener("click", function() {
        imgTrophy.classList.add("swing");
    });

    // Trophies Handling
    newDivTrophy.className = "trophyDesign";
    // imgTrophy.style.display = "block";

    switch (trophyTitle) {
        case "Max Silver":
            imgTrophy.src = challengeTrophies["Max Silver"].trophyImg;
            imgTrophy.style.width = "3.6em";
            imgTrophy.style.height = "3.6em";
            break;
        case "Max Silver Plus":
            imgTrophy.src = challengeTrophies["Max Silver Plus"].trophyImg;
            imgTrophy.style.right = "-105px";
            imgTrophy.style.width = "5.1em";
            imgTrophy.style.height = "5.1em";
            break;
        case "Max Gold":
            imgTrophy.src = challengeTrophies["Max Gold"].trophyImg;
            imgTrophy.style.width = "4.85em";
            imgTrophy.style.height = "4.85em";
            break;
        case "Max Gold Plus":
            imgTrophy.src = challengeTrophies["Max Gold Plus"].trophyImg;
            imgTrophy.style.width = "4.5em";
            imgTrophy.style.height = "4.5em";
            imgTrophy.style.right = "-90px";
            break;
        case "Max Platinum":
            imgTrophy.src = challengeTrophies["Max Platinum"].trophyImg;
            imgTrophy.style.width = "5em";
            imgTrophy.style.height = "5em";
            imgTrophy.style.right = "-100px";
            break;

        default:
            imgTrophy.src = "";
            imgTrophy.style.opacity = ".0";

    }
    // Trophy Img Handling
    imgTrophy.addEventListener("error", function() {
        imgTrophy.src = "";
        imgTrophy.style.opacity = ".0";
    });

    if (imgArr.length > globalPreload.index) {
        newDiv.appendChild(img);
        newDiv.appendChild(newName);
        newDivTrophy.appendChild(imgTrophy);
        newDiv.appendChild(newDivTrophy);
        listWarriors.appendChild(newDiv);
        globalPreload.index++;
        //set click Listener to the current avatar.
        addListenerEachElement(newDiv, newDiv.id, "click");

        if (galleryCounter <= 30) {
            loadingGallery.innerHTML = `Loading(` + galleryCounter + `)...`;
        } else {
            loadingGallery.innerHTML = `Loading...`;
        }

    } else {
        loadingGallery.innerHTML = "List loaded!";
        setTimeout(() => loadingGallery.innerHTML = "", 5000);
        clearInterval(globalPreload.load);
        return;
    }
}




//ACCORDION HANDLING
function runAccordion(buttonClass) {
    var accordion = document.querySelectorAll(buttonClass),
        ind = 0;

    for (; ind < accordion.length; ind++) {
        accordion[ind].onclick = function() {
            this.classList.toggle("active");
        };
    }
}




//MODALS AND ALERTS HANDLING
//Modal Box
function getModalBox(mContainer, mContent, mCloseBtn, mTrigger) {
    var container = document.querySelector(mContainer),
        content = document.querySelector(mContent),
        closeButton = document.querySelector(mCloseBtn),
        trigger = document.querySelector(mTrigger);

    try {
        // closeButton.onclick = function() { toggleModal(); };
        trigger.onclick = function() { toggleModal(); };
        content.onclick = function() { toggleModal(); };
        // window.onclick = function() { windowOnClick(); };

        function toggleModal() {
            container.classList.toggle("showModalBox");
        }

        function windowOnClick(event) {
            if ((event.target || event.srcElement) === container) {
                toggleModal();
            }
        }
    } catch (err) {
        return;
    }

}
// Modal Images
function getModalImgs(imgClass) {
    var counter = 0,
        targetImgs = document.querySelectorAll(imgClass),
        modalImgContainer = document.querySelector(".modalImgContainer"),
        modalImgContent = document.querySelector(".modalImgContent"),
        modalImgCaption = document.querySelector(".modalImgCaption"),
        modalImgClose = document.querySelector(".modalImgClose");

    for (; counter < targetImgs.length; counter++) {
        targetImgs[counter].addEventListener("click", function() {
            modalImgContainer.style.display = "block";
            modalImgContent.src = this.src;
            modalImgCaption.innerHTML = this.alt;
        });
    }
    modalImgClose.addEventListener("click", function() {
        modalImgContainer.style.display = "none";
    });
}

//Alerts
function getWarning(targetElem) {
    var targetElements = document.querySelectorAll(targetElem),
        // closeX = document.querySelector(targetElem + " .span");
        ind = 0;
    for (; ind < targetElements.length; ind++) {
        var targetNow = targetElements[ind];

        targetNow.style.opacity = "1";
        setTimeout(function() {
            targetNow.style.display = "none";
        }, 10000);
    }
}
//MODALS AND ALERTS HANDLING - END


function spinner() {
    let spinner = document.getElementById("spinner"),
        timerLaunch = document.getElementById("timerLaunch"),
        counter = 5;

    document.body.style.background = '#fff';
    document.body.style.visibility = 'hidden';
    spinner.style.visibility = 'visible';
    timerLaunch.style.visibility = 'visible';
    timerLaunch.style.marginTop = '40px';

    // Timer
    let countDown = function() {
        if (counter === 0) {
            clearInterval(this);
            spinner.style.visibility = 'hidden';
            timerLaunch.style.display = 'none'; //n4

            document.body.style.visibility = 'visible';
            document.body.style.cssText = 'url("background.jpg") no-repeat fixed;';
        } else {
            timerLaunch.innerHTML = `Code starting in<br>${counter--} secs`;
        }
    };

    setInterval(countDown, 1000);

}

//title of Hall of fame
//newClass includes to add a class which show element.
//use CSS sticky position instead of fixed one. OTherwise, when scroll to the top, it won't work out.
function showFixedTitleInSpecificElem(targetElement, nextElement, newClasses) {
    window.addEventListener("scroll", () => {
        var targetElem = document.getElementById(targetElement),
            nextElem = document.getElementById(nextElement),
            clickWarning = document.getElementById("clickWarning");
            /*timer = 25*/

        var currPosElem = targetElem.offsetTop, //int value
            currPosNextElem = nextElem.offsetTop,
            bodyScroll = Math.ceil(document.body.scrollTop),
            documentScroll = Math.ceil(document.documentElement.scrollTop);

        if ((bodyScroll || documentScroll) >= currPosElem && (bodyScroll || documentScroll) <= currPosNextElem) {
            targetElem.className = newClasses;
            targetElem.style.visibility = "visible";
            //This snippet should be executed outside to avoid flickering effect on scrolling on mobiles
            // setTimeout(() => {
            //     clickWarning.innerHTML = "<br>(Click on image for cards!)";
            //     clickWarning.style.fontSize = "15px";
            // }, 9000);
            // let timerClickWarning = function() {
            //     if (timer <= 0) {
            //         clearInterval(this);
            //         clickWarning.innerHTML = "";
            //         return;
            //     } else {
            //         timer--;
            //     }
            // };
            // setInterval(timerClickWarning, 1000);
        } else {
            targetElem.className = "";
            targetElem.style.visibility = "hidden";

        }
    });

}

//GOAL: get values when clicking
//if you need index for methods like children to get an specific child, set index in the second argument.
//outerHTML = target.outerHTML is great to check Js created elements on console.
document.onclick = (event) => {
    function getChildContentByParentOnClicking(idOrClass, containerParent, childProp, ind) {
        ind = ind || false;
        var target = event.target || event.srcElement,
            clickedParentElem = target.parentNode,
            contentTargetChild = null,
            acceptedContainerTarget = null,
            typeSelector = null;

        if (idOrClass === "id") {
            acceptedContainerTarget = document.getElementById(containerParent);
            typeSelector = "id";
        } else if (idOrClass === "class") {
            acceptedContainerTarget = document.querySelector("." + containerParent);
            typeSelector = "className";
        }

        if (clickedParentElem[typeSelector] !== acceptedContainerTarget[typeSelector]) {
            return;
        }

        if (ind) {
            contentTargetChild = clickedParentElem[childProp][ind].innerHTML;
        } else {
            contentTargetChild = clickedParentElem.childProp.innerHTML;
        }
        return contentTargetChild;
    }
    coreData.currClickedWarrior = getChildContentByParentOnClicking("class", "avatarContainer", "children", 1);
    // Goal: Data to attach in the warrior card
    (function getDataClickedWarrior() {
        var nameWarrior = document.querySelector("#nameWarrior"),
            modalPicTrophy = document.querySelector("#modalPicTrophy"),
            modalPicWarrior = document.querySelector("#modalPicWarrior"),
            desc = document.querySelector("#descTrophy"),
            trophysTitle = document.querySelector("#trophysTitle"),
            battleDays = document.querySelector("#battleDays"),
            ratingStay = document.querySelector("#ratingStay");
        // find number of img id
        var imgId;

        if (coreData.currClickedWarrior != undefined) {
            try {
                nameWarrior.innerHTML = coreData.currClickedWarrior.toUpperCase();
                trophysTitle.innerHTML = challengeTrophies.findTitle(coreData.currClickedWarrior);
                // inserting images in the cards
                modalPicTrophy.src = challengeTrophies[trophysTitle.innerHTML].trophyImg;
                modalPicTrophy.addEventListener("error", function() {
                    modalPicTrophy.src = "https://imgur.com/j24BO7N.png";
                });
                imgId = getData()[3][coreData.currClickedWarrior];
                modalPicWarrior.src = `https://api.sololearn.com/Uploads/Avatars/${imgId}.jpg`;
                modalPicWarrior.addEventListener("error", function() {
                    modalPicWarrior.src = "https://drive.google.com/uc?export=download&id=1ThBODokPY3N46HT7GpNVhpgl0n2lwoWK";
                });
                //
                battleDays.innerHTML = fightDays.getInfo(coreData.currClickedWarrior);
                desc.innerHTML = challengeTrophies[trophysTitle.innerHTML].desc;
                ratingStay.innerHTML = getListOldestToNewest();
            } catch (err) {

            }

        } else {
            getWarning(".alertWarningBottom");
            trophysTitle.innerHTML =
                trophysTitle.innerHTML =
                battleDays.innerHTML =
                desc.innerHTML =
                ratingStay.innerHTML = "-";
        }
    })();
};

//force window to be on the top
window.addEventListener("beforeunload", () => {
    this.scrollTo(0, 0);
});
window.addEventListener("DOMContentLoaded", () => { //n1
    globalPreload.load;
    spinner();
    runAccordion(".accordion, .sub");
    showFixedTitleInSpecificElem("titleHallEffect", "loadingGallery", "titleHallEffect shadow growBox");
    getModalBox("#modalContainer", "#modalContent", "#closeButton", "#issueSlTrigger");
    getModalImgs(".targetModalImg");
});


/* COMMENTS
n1: I make usage of DOMContentLoaded instead of "onload" event
    because it runs right after the DOM is rendered without
    waiting for styling, images, frames to finish loading.
n2: this global namespace structure is necessary to increment the function one at a time
    and also to clear Interval anonymous function. This also avoid conflicting with other global variables.
n3: could also be coreData.allImages. This instance is set here to run the function once and not being executed another random number sequence.
n4: I changed to display instead of visibility property because the thunder effect would not appear fullscreen due to occupied area of h1 block Element.
n5: I classified 2 main categories of warriors: multi stormers who sent/received at least 3 JS challenges and full stormers are those who boldly sent/received 12 JS challenges during this day.
n6: max silver - 1x multi storming (+3 challenges)
    max silver plus - 2x multi storming (+3 challenges)
    max gold - 1x full storming (+12 challenges)
    max gold plus - 1x multi storming and 1x full storming.
    max platinum - 2x full storm
n7: document.documentElement for Chrome and Mozilla.
*/