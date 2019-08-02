var rows = 15;
var columns = 15;
var timeInMs = 85;
var directions = ['north',
    'south',
    'east',
    'west'
];
var width = 0;
var height = 0;
$(document).ready(function () {
    width = ($("#maze").width() / columns) - 2;
    height = ($("#maze").height() / rows) - 2;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            $("#maze").append("<div class='maze-child' id=" + i.toString() + "-" + j.toString() + " style='width:" + width + "px; height: " + height + "px;' x=" + i + " y=" + j + " visited=false></div>");
        }
    }
    $("#createMazeBtn").on('click', function () {
        var randomX = Math.floor(Math.random() * rows);
        var randomY = Math.floor(Math.random() * columns);
        createMaze(randomX, randomY);
        var currentCellId = "#" + randomX + "-" + randomY;
        // $(currentCellId).append("<p class='start' style='width:" + width + "px;height:" + height + "px;'>start</p>");
    })
});

function createMaze(x, y) {
    var currentCellId = "#" + x + "-" + y;
    $(currentCellId).addClass("visited");

    var nextCell = getNextCellId(x, y);
    var nextCellId = nextCell ? nextCell.nextCellId : null;
    if (nextCellId != null) {

        var x = nextCellId.replace('#', '').split('-')[0];
        var y = nextCellId.replace('#', '').split('-')[1];
        setTimeout(function () {
            var direction = nextCell.movedDirection
            if (direction == 'north') {
                $(currentCellId).addClass('north');
                $(nextCellId).addClass('south');
            } else if (direction == 'south') {
                $(currentCellId).addClass('south');
                $(nextCellId).addClass('north');
            } else if (direction == 'east') {
                $(currentCellId).addClass('east');
                $(nextCellId).addClass('west');
            } else if (direction == 'west') {
                $(currentCellId).addClass('west');
                $(nextCellId).addClass('east');
            }
            createMaze(parseInt(x), parseInt(y));
        }, timeInMs);

    } else {
        $(currentCellId).addClass('visited-completely');
        var nextCell = getNextVisitedCellId(currentCellId);
        if (nextCell != null) {
            var nextCellX = parseInt(nextCell.nextCellId.replace("#", "").split('-')[0]);
            var nextCellY = parseInt(nextCell.nextCellId.replace("#", "").split('-')[1]);
            var nextCellId = nextCell.nextCellId;
            setTimeout(function () {
                var direction = nextCell.movedDirection
                if (direction == 'north') {
                    $(currentCellId).addClass('north-visited');
                    $(nextCellId).addClass('south-visited');
                } else if (direction == 'south') {
                    $(currentCellId).addClass('south-visited');
                    $(nextCellId).addClass('north-visited');
                } else if (direction == 'east') {
                    $(currentCellId).addClass('east-visited');
                    $(nextCellId).addClass('west-visited');
                } else if (direction == 'west') {
                    $(currentCellId).addClass('west-visited');
                    $(nextCellId).addClass('east-visited');
                }
                createMaze(nextCellX, nextCellY);
            }, timeInMs);
        } else {
            // $(currentCellId).append("<p class='end' style='width:" + width + "px;height:" + height + "px;'></p>");
        }
    }
}
var getNextVisitedCellId = function (currentCellId) {
    var possibleDirections = $(directions).filter($(currentCellId)[0].classList);
    var nextCell = null;
    var x = parseInt(currentCellId.replace("#", "").split('-')[0]);
    var y = parseInt(currentCellId.replace("#", "").split('-')[1]);
    for (var direction in possibleDirections) {
        if (possibleDirections[direction] == 'north') {
            if (!$("#" + (x - 1) + "-" + y).hasClass('visited-completely')) {
                nextCell = {
                    nextCellId: "#" + (x - 1) + "-" + y,
                    movedDirection: possibleDirections[direction]
                }
            }
        } else if (possibleDirections[direction] == 'south') {
            if (!$("#" + (x + 1) + "-" + y).hasClass('visited-completely')) {
                nextCell = {
                    nextCellId: "#" + (x + 1) + "-" + y,
                    movedDirection: possibleDirections[direction]
                }
            }
        } else if (possibleDirections[direction] == 'east') {
            if (!$("#" + x + "-" + (y + 1)).hasClass('visited-completely')) {
                nextCell = {
                    nextCellId: "#" + x + "-" + (y + 1),
                    movedDirection: possibleDirections[direction]
                }
            }
        } else if (possibleDirections[direction] == 'west') {
            if (!$("#" + x + "-" + (y - 1)).hasClass('visited-completely')) {
                nextCell = {
                    nextCellId: "#" + x + "-" + (y - 1),
                    movedDirection: possibleDirections[direction]
                }
            }
        }
        if (nextCell != null) {
            break;
        }
    }
    return nextCell;
}
var getNextCellId = function (x, y) {
    var nextCell = null;
    var tempdirections = shuffleArray(JSON.parse(JSON.stringify(directions)));
    for (var direction in tempdirections) {
        switch (tempdirections[direction]) {
            case 'north':
                if (x - 1 >= 0) {
                    if (!$("#" + (x - 1) + "-" + y).hasClass('visited')) {
                        nextCell = {
                            nextCellId: "#" + (x - 1) + "-" + y,
                            movedDirection: tempdirections[direction]
                        }
                    }
                }
                break;
            case 'south':
                if (x + 1 < columns) {
                    if (!$("#" + (x + 1) + "-" + y).hasClass('visited')) {
                        nextCell = {
                            nextCellId: "#" + (x + 1) + "-" + y,
                            movedDirection: tempdirections[direction]
                        }
                    }
                }
                break;
            case 'east':
                if (y + 1 < rows) {
                    if (!$("#" + x + "-" + (y + 1)).hasClass('visited')) {
                        nextCell = {
                            nextCellId: "#" + x + "-" + (y + 1),
                            movedDirection: tempdirections[direction]
                        }
                    }
                }
                break;
            case 'west':
                if (y - 1 >= 0) {
                    if (!$("#" + x + "-" + (y - 1)).hasClass('visited')) {
                        nextCell = {
                            nextCellId: "#" + x + "-" + (y - 1),
                            movedDirection: tempdirections[direction]
                        }
                    }
                }
                break;
        }
        if (nextCell != null) break;
    }
    return nextCell;
};

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
