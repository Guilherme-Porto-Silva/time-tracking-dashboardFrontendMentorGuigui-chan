// JSON dialing start

let DailyInfo = [
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
];

let WeeklyInfo = [
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
];

let MonthlyInfo = [
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
    {
        activity: "",
        timeCurrent: "",
        timePrevious: "",
    },
];

function fillObjects(informations) {

    DailyInfo = informations.map(info => ({

        activity: info.title,

        timeCurrent: `${info.timeframes.daily.current}hrs`,

        timePrevious: `Previous - ${info.timeframes.daily.previous}hrs`

    }));

    WeeklyInfo = informations.map(info => ({

        activity: info.title,

        timeCurrent: `${info.timeframes.weekly.current}hrs`,

        timePrevious: `Previous - ${info.timeframes.weekly.previous}hrs`
    }));

    MonthlyInfo = informations.map(info => ({

        activity: info.title,

        timeCurrent: `${info.timeframes.monthly.current}hrs`,

        timePrevious: `Previous - ${info.timeframes.monthly.previous}hrs`
    }));
}


async function requestFunction() {

    const response = await fetch("./data.json");

    const informations = await response.json();

    fillObjects(informations);
}


// JSON dialing end

const userProfile = document.getElementById("userProfileId");

const DailyButton = document.getElementById("DailyButtonId");

const WeeklyButton = document.getElementById("WeeklyButtonId");

const MonthlyButton = document.getElementById("MonthlyButtonId");

const buttons = Array.from(userProfile.querySelectorAll("button"));

const displayers = Array.from(document.getElementsByClassName("displayer"));

function inicializeDisplayers() {

    displayers.forEach((displayer, index) => {

        displayer.querySelector("h5").textContent = DailyInfo[index].activity;

        displayer.querySelector("h1").textContent = DailyInfo[index].timeCurrent;
        
        displayer.querySelector("span").textContent = DailyInfo[index].timePrevious;
    });
    
}

function updateButtons(time) {

    buttons.forEach(button => button.classList.remove("selected"));

    if (time == "Daily") DailyButton.classList.add("selected");

    else if (time == "Weekly") WeeklyButton.classList.add("selected");

    else MonthlyButton.classList.add("selected");
}


function updateDisplayers(time) {

    if(time == "Daily") inicializeDisplayers();

    else if(time == "Weekly") displayers.forEach((displayer, index) => {

        displayer.querySelector("h5").textContent = WeeklyInfo[index].activity;

        displayer.querySelector("h1").textContent = WeeklyInfo[index].timeCurrent;

        displayer.querySelector("span").textContent = WeeklyInfo[index].timePrevious;
    });
    

    else displayers.forEach((displayer, index) => {

        displayer.querySelector("h5").textContent = MonthlyInfo[index].activity;

        displayer.querySelector("h1").textContent = MonthlyInfo[index].timeCurrent;

        displayer.querySelector("span").textContent = MonthlyInfo[index].timePrevious;
    });

    updateButtons(time);
}

document.addEventListener("DOMContentLoaded", async () => {

    await requestFunction();

    inicializeDisplayers();// depends on requestFunction();
});

DailyButton.addEventListener("click", () => updateDisplayers('Daily'));

WeeklyButton.addEventListener("click", () => updateDisplayers('Weekly'));

MonthlyButton.addEventListener("click", () => updateDisplayers('Monthly'));