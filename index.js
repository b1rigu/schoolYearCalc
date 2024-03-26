function getWorkdaysInMonth(year, month, nonWorkDaysOfWeek) {
    const daysInMonth = new Date(year, month, 0).getDate();
    let workdays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const dayOfWeek = currentDate.getDay();
        let isWorkDay = true;

        for (let i = 0; i < nonWorkDaysOfWeek.length; i++) {
            const nonWorkDayOfWeek = nonWorkDaysOfWeek[i];
            if (dayOfWeek == nonWorkDayOfWeek) {
                isWorkDay = false;
                break;
            }
        }

        if (isWorkDay) {
            workdays++;
        }
    }

    return workdays;
}

class Rule {
    constructor({
        nonWorkDays,
        daysOfWorkInAWeek,
        workHoursOnDays,
        middleSchoolTotalYearsToStudy,
        middleSchoolClassHoursInAWeekByYear,
        middleSchoolOneSchoolHourInRealityMinutes,
        undergraduateSchoolTotalYearsToStudy,
        undergraduateSchoolClassHoursInAWeekByYear,
        undergraduateSchoolOneSchoolHourInRealityMinutes,
    }) {
        this.nonWorkDays = nonWorkDays;
        this.daysOfWorkInAWeek = daysOfWorkInAWeek;
        this.workHoursOnDays = workHoursOnDays;
        this.middleSchoolTotalYearsToStudy = middleSchoolTotalYearsToStudy;
        this.middleSchoolClassHoursInAWeekByYear = middleSchoolClassHoursInAWeekByYear;
        this.middleSchoolOneSchoolHourInRealityMinutes = middleSchoolOneSchoolHourInRealityMinutes;
        this.undergraduateSchoolTotalYearsToStudy = undergraduateSchoolTotalYearsToStudy;
        this.undergraduateSchoolClassHoursInAWeekByYear =
            undergraduateSchoolClassHoursInAWeekByYear;
        this.undergraduateSchoolOneSchoolHourInRealityMinutes =
            undergraduateSchoolOneSchoolHourInRealityMinutes;
        this.schoolYearMonths = [9, 10, 11, 12, 1, 2, 3, 4, 5];
    }

    calculateTotalMiddleSchoolHoursInRealityMinutes(
        startYear,
        returnTimeForFavouriteOnly = false,
        favouriteSpentClassHoursInAWeek = 4
    ) {
        let totalMiddleSchoolHoursInRealityMinutes = 0;
        let counter = 0;
        for (let year = startYear; year < startYear + this.middleSchoolTotalYearsToStudy; year++) {
            let totalSchoolDays = 0;
            this.schoolYearMonths.forEach((month, index) => {
                if (index <= 3) {
                    totalSchoolDays += getWorkdaysInMonth(month, year, [0, 6]);
                } else {
                    totalSchoolDays += getWorkdaysInMonth(month, year + 1, [0, 6]);
                }
            });
            const currentYearSchoolHoursInAWeek = this.middleSchoolClassHoursInAWeekByYear[counter];
            const currentYearOneSchoolHourInRealityMinutes =
                this.middleSchoolOneSchoolHourInRealityMinutes[counter];
            let currentYearSchoolHoursInADay = 0;
            if (returnTimeForFavouriteOnly) {
                currentYearSchoolHoursInADay = favouriteSpentClassHoursInAWeek / 5;
            } else {
                currentYearSchoolHoursInADay = currentYearSchoolHoursInAWeek / 5;
            }
            totalMiddleSchoolHoursInRealityMinutes +=
                currentYearSchoolHoursInADay *
                currentYearOneSchoolHourInRealityMinutes *
                totalSchoolDays;
            counter++;
        }
        return totalMiddleSchoolHoursInRealityMinutes;
    }

    calculateTotalUndergraduateSchoolHoursInRealityMinutes(startYear) {
        let totalUndergraduateSchoolHoursInRealityMinutes = 0;
        let counter = 0;
        for (
            let year = startYear;
            year < startYear + this.undergraduateSchoolTotalYearsToStudy;
            year++
        ) {
            let totalSchoolDays = 0;
            this.schoolYearMonths.forEach((month, index) => {
                if (index <= 3) {
                    totalSchoolDays += getWorkdaysInMonth(month, year, [0, 6]);
                } else {
                    totalSchoolDays += getWorkdaysInMonth(month, year + 1, [0, 6]);
                }
            });
            const currentYearSchoolHoursInAWeek =
                this.undergraduateSchoolClassHoursInAWeekByYear[counter];
            const currentYearOneSchoolHourInRealityMinutes =
                this.undergraduateSchoolOneSchoolHourInRealityMinutes[counter];
            const currentYearSchoolHoursInADay = currentYearSchoolHoursInAWeek / 5;
            totalUndergraduateSchoolHoursInRealityMinutes +=
                currentYearSchoolHoursInADay *
                currentYearOneSchoolHourInRealityMinutes *
                totalSchoolDays;
            counter++;
        }
        return totalUndergraduateSchoolHoursInRealityMinutes;
    }

    calculate8WeeksOfUndergraduateSchoolHoursInRealityMinutes() {
        const currentYearSchoolHoursInAWeek = this.undergraduateSchoolClassHoursInAWeekByYear[0];
        const currentYearOneSchoolHourInRealityMinutes =
            this.undergraduateSchoolOneSchoolHourInRealityMinutes[0];
        return currentYearSchoolHoursInAWeek * 8 * currentYearOneSchoolHourInRealityMinutes;
    }
}

// Тухайн үед хөдөлмөрийн хуулиар 7 хоногт ажлын 6 өдөртэй, ажлын цаг 1-5 дахь өдөрт 8 цаг, 6
// дахь өдөрт 6 цаг байсан бөгөөд дунд сургуулийн 1-3 дугаар ангид бүх өдөр нь ижилхэн 4 цагийн
// хичээл, 4-8 дугаар ангид 7 хоногт нийт 34 цагийн хичээл ордог, 9-10 дугаар ангид бүх өдөр нь
// ижилхэн 6 цагийн хичээл ордог байсан. Дээд сургуульд бүх өдөр нь ижилхэн 3 цагийн хичээлтэй
// байсан. Дунд сургуулийн 1 цагийн үргэлжлэх хугацаа нь 45 минут, дээд сургуулийнх 90 минут
// байсан.
const rulesUntil1993 = new Rule({
    nonWorkDays: [0],
    daysOfWorkInAWeek: 6,
    workHoursOnDays: [8, 8, 8, 8, 8, 6],
    middleSchoolTotalYearsToStudy: 10,
    middleSchoolClassHoursInAWeekByYear: [20, 20, 20, 34, 34, 34, 34, 34, 30, 30],
    middleSchoolOneSchoolHourInRealityMinutes: [45, 45, 45, 45, 45, 45, 45, 45, 45, 45],
    undergraduateSchoolTotalYearsToStudy: 5,
    undergraduateSchoolClassHoursInAWeekByYear: [15, 15, 15, 15, 15],
    undergraduateSchoolOneSchoolHourInRealityMinutes: [90, 90, 90, 90, 90],
});

// Дурьдсан хугацаанд хөдөлмөрийн хуулиар 7 хоногт ажлын 5 өдөртэй, ажлын 8 цагтай байсан
// бөгөөддунд сургуулийн 1-5 дугаар ангид бүх өдөр нь ижилхэн 4 цагийн хичээл, 6-12 дугаар ангид
// бүх өдөр нь ижилхэн 6 цагийн хичээл ордог. Дээд сургуульд бүх өдөр нь ижилхэн 3 цагийн
// хичээлтэй байсан.Дунд сургуулийн хичээлийн үргэлжлэх хугацаа 1-5 дугаар ангид 30 минут, 6-12
// дугаар ангид 35 минут, дээд сургуулийнх 90 минут
const rulesAfter1993 = new Rule({
    nonWorkDays: [0, 6],
    daysOfWorkInAWeek: 5,
    workHoursOnDays: [8, 8, 8, 8, 8],
    middleSchoolTotalYearsToStudy: 12,
    middleSchoolClassHoursInAWeekByYear: [20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 30],
    middleSchoolOneSchoolHourInRealityMinutes: [30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 35, 35],
    undergraduateSchoolTotalYearsToStudy: 4,
    undergraduateSchoolClassHoursInAWeekByYear: [15, 15, 15, 15],
    undergraduateSchoolOneSchoolHourInRealityMinutes: [90, 90, 90, 90],
});

function calculateTotalSchoolHoursInRealityMinutes(
    middleSchoolStartYear,
    undergraduateSchoolStartYear
) {
    let totalSchoolHoursInRealityMinutes = 0;
    if (middleSchoolStartYear >= 1994) {
        totalSchoolHoursInRealityMinutes +=
            rulesAfter1993.calculateTotalMiddleSchoolHoursInRealityMinutes(middleSchoolStartYear);
    } else {
        totalSchoolHoursInRealityMinutes +=
            rulesUntil1993.calculateTotalMiddleSchoolHoursInRealityMinutes(middleSchoolStartYear);
    }

    if (undergraduateSchoolStartYear >= 1994) {
        totalSchoolHoursInRealityMinutes +=
            rulesAfter1993.calculateTotalUndergraduateSchoolHoursInRealityMinutes(
                undergraduateSchoolStartYear
            );
    } else {
        totalSchoolHoursInRealityMinutes +=
            rulesUntil1993.calculateTotalUndergraduateSchoolHoursInRealityMinutes(
                undergraduateSchoolStartYear
            );
    }
    return totalSchoolHoursInRealityMinutes;
}

function calculateMiddleSchoolFavouriteHoursInRealityMinutes(middleSchoolStartYear) {
    let totalSchoolHoursInRealityMinutes = 0;
    if (middleSchoolStartYear >= 1994) {
        totalSchoolHoursInRealityMinutes +=
            rulesAfter1993.calculateTotalMiddleSchoolHoursInRealityMinutes(
                middleSchoolStartYear,
                true
            );
    } else {
        totalSchoolHoursInRealityMinutes +=
            rulesUntil1993.calculateTotalMiddleSchoolHoursInRealityMinutes(
                middleSchoolStartYear,
                true
            );
    }
    return totalSchoolHoursInRealityMinutes;
}

function calculateInternshipToUndergraduateRealityMinutesRatio(undergraduateSchoolStartYear) {
    if (undergraduateSchoolStartYear >= 1994) {
        return (
            (rulesAfter1993.calculate8WeeksOfUndergraduateSchoolHoursInRealityMinutes(
                undergraduateSchoolStartYear
            ) /
                (rulesAfter1993.calculateTotalUndergraduateSchoolHoursInRealityMinutes(
                    undergraduateSchoolStartYear
                ) /
                    rulesAfter1993.undergraduateSchoolTotalYearsToStudy)) *
            100
        );
    } else {
        return (
            (rulesUntil1993.calculate8WeeksOfUndergraduateSchoolHoursInRealityMinutes(
                undergraduateSchoolStartYear
            ) /
                (rulesUntil1993.calculateTotalUndergraduateSchoolHoursInRealityMinutes(
                    undergraduateSchoolStartYear
                ) /
                    rulesUntil1993.undergraduateSchoolTotalYearsToStudy)) *
            100
        );
    }
}

let answerOneTwoChart;
let answerThreeChart;

function answerTheQuestions() {
    const firstMiddleSchoolEnterYear = Number(document.getElementById(`selectYear0`).value);
    const firstUndergraduateSchoolEnterYear = Number(document.getElementById(`selectYear1`).value);
    const secondMiddleSchoolEnterYear = Number(document.getElementById(`selectYear2`).value);
    const secondUndergraduateSchoolEnterYear = Number(document.getElementById(`selectYear3`).value);

    if (
        firstMiddleSchoolEnterYear == 0 ||
        firstUndergraduateSchoolEnterYear == 0 ||
        secondMiddleSchoolEnterYear == 0 ||
        secondUndergraduateSchoolEnterYear == 0
    )
        return;

    const totalHoursFirst = calculateTotalSchoolHoursInRealityMinutes(
        firstMiddleSchoolEnterYear,
        firstUndergraduateSchoolEnterYear
    );
    const totalHoursSecond = calculateTotalSchoolHoursInRealityMinutes(
        secondMiddleSchoolEnterYear,
        secondUndergraduateSchoolEnterYear
    );

    const totalFavouriteHoursFirst = calculateMiddleSchoolFavouriteHoursInRealityMinutes(
        firstMiddleSchoolEnterYear
    );
    const totalFavouriteHoursSecond = calculateMiddleSchoolFavouriteHoursInRealityMinutes(
        secondMiddleSchoolEnterYear
    );

    const internPercentageFirst = calculateInternshipToUndergraduateRealityMinutesRatio(
        firstUndergraduateSchoolEnterYear
    );

    const internPercentageSecond = calculateInternshipToUndergraduateRealityMinutesRatio(
        secondUndergraduateSchoolEnterYear
    );

    const ctx = document.getElementById("answerOneTwoChart");
    const ctx2 = document.getElementById("answerThreeChart");

    const config = {
        type: "bar",
        data: {
            labels: ["1", "2"],
            datasets: [
                {
                    label: "Хичээлийн (Дунд, Дээд) суралцах цаг минутаар",
                    data: [totalHoursFirst, totalHoursSecond],
                    borderWidth: 1,
                },
                {
                    label: "Сонирхолтой хичээл (Дунд) суралцах цаг минутаар",
                    data: [totalFavouriteHoursFirst, totalFavouriteHoursSecond],
                    borderWidth: 1,
                },
            ],
        },
        responsive: true,
        options: {
            animation: {
                radius: {
                    duration: 400,
                    easing: "linear",
                    loop: (context) => context.active,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    const config2 = {
        type: "bar",
        data: {
            labels: ["1", "2"],
            datasets: [
                {
                    label: "Дадлагийн (Дээд) эзлэх хувь",
                    data: [internPercentageFirst, internPercentageSecond],
                    borderWidth: 1,
                },
            ],
        },
        responsive: true,
        options: {
            animation: {
                radius: {
                    duration: 400,
                    easing: "linear",
                    loop: (context) => context.active,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    if (answerOneTwoChart) answerOneTwoChart.destroy();
    answerOneTwoChart = new Chart(ctx, config);

    if (answerThreeChart) answerThreeChart.destroy();
    answerThreeChart = new Chart(ctx2, config2);
}

let fragment = document.createDocumentFragment();

for (let i = 1950; i < 2050; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    fragment.appendChild(option.cloneNode(true));
}

for (let i = 0; i < 4; i++) {
    const yearSelector = document.getElementById(`selectYear${i}`);
    yearSelector.appendChild(fragment.cloneNode(true));
}

document.getElementById("calculate-btn").addEventListener("click", () => {
    answerTheQuestions();
});
