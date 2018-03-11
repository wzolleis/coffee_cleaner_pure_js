const DATE_FORMAT = "DD.MM.YYYY";

let state = {
    teams: [],
    startTeam: null,
    startDate: null,
    startDate: moment().day('Monday'),
    tasks: [],

};

$("#results").on("click", "li", function () {
    $(this).toggleClass("completed");
});

$("#calculate").click(function () {
    state.teams = getTeams();

    clearTasks();

    var teamInput = $("#team_input").val();
    state.startTeam = teamInput ? Number(teamInput) - 1 : 0;
    state.startDate = moment().day('Monday');

    calculateTasks(state.startTeam, state.startDate);
    addTasksToUI(state.tasks);
});

calculateTasks = function (currentTeam, startDate) {
    var week = calculateWeek(startDate);
    var team = state.teams[currentTeam];

    state.tasks[0] = {team, week}
    for (i = 1; i < 10; i++) {
        week = nextWeek(week);
        team = nextTeam(state.teams, team);
        state.tasks[i] = {team, week};
    }
}

addTasksToUI = function (tasks) {
    for (i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        appendTaskItem(task);
    }
}

appendTaskItem = function (task) {
    var startTxt = formatDateAsString(task.week.startOfWeek);
    var endTxt = formatDateAsString(task.week.endOfWeek);
    $("#results").append("<li class='task'>" + "'" + task.team + "': von " + startTxt + " bis " + endTxt + "</li>");
}

clearTasks = function () {
    state.tasks = [];
    $(".task").remove();
}

getTeams = function () {
    var resultArray = [];
    $('.team').each(function () {
        resultArray.push($(this).text());
    });

    return resultArray;
}

nextTeam = function (teams, currentTeam) {
    var currentIndex = teams.indexOf(currentTeam);
    var nextIndex = currentIndex + 1;
    var numOfTeams = teams.length;
    if (nextIndex > numOfTeams - 1) {
        nextIndex = 0;
    }
    return teams[nextIndex];
}

printWeek = function (prefix, week) {
    var startTxt = formatDateAsString(week.startOfWeek);
    var endTxt = formatDateAsString(week.endOfWeek);
}

calculateWeek = function (startOfWeek) {
    var endOfWeek = moment(startOfWeek);
    endOfWeek.add(4, 'days');
    var week = {startOfWeek, endOfWeek};
    return week;
}

nextWeek = function (week) {
    return calculateWeek(week.startOfWeek.add(7, "days"));
}

formatDateAsString = function (date) {
    return date.format(DATE_FORMAT);
}
