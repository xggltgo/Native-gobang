//简化代码
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
//承载棋格的容器
var container = $(".container");
//每一颗棋子的信息数组
var chessArray = [];
var count = 0;
var isGameOver = false;
var table = $("table");
var tdWH = table.clientWidth / 15;

function main() {
  //动态生成棋格
  initTables(15, 15, table);
  //获取表格 注册点击事件
  table.addEventListener("click", function (e) {
    if (e.target.tagName !== "TD") {
      return;
    }
    if (!isGameOver) {
      count++;
      var startColor = count % 2 !== 0 ? "#000" : "#FFF";
      var positionX = e.offsetX < tdWH / 2 ? "left" : "right";
      var positionY = e.offsetY < tdWH / 2 ? "top" : "bottom";
      if (positionX === "left" && positionY === "top") {
        createChess(e.target, startColor, "leftTop", count);
      } else if (positionX === "right" && positionY === "top") {
        createChess(e.target, startColor, "rightTop", count);
      } else if (positionX === "left" && positionY === "bottom") {
        createChess(e.target, startColor, "leftBottom", count);
      } else {
        createChess(e.target, startColor, "rightBottom", count);
      }
    } else {
      if (window.confirm("是否要重新开始一局？")) {
        isGameOver = false;
        initTables(15, 15, table);
        count = 0;
        chessArray = [];
      }
    }
  });
}

main();

/**
 * 动态生成棋格（表格）
 * @param {Number} row 行数
 * @param {Number} column 列数
 * @param {DOM} container 装载棋格（表格）的 dom容器
 */
function initTables(row, column, container) {
  container.innerHTML = "";
  for (var i = 0; i < row; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < column; j++) {
      var td = document.createElement("td");
      td.setAttribute("cow", i);
      td.setAttribute("column", j);
      tr.appendChild(td);
    }
    container.appendChild(tr);
  }
}

/**
 * 创建一颗棋子
 * @param {DOM} tdContainer 传入当前点击的格子dom容器
 * @param {String} chessColor 传入棋子颜色
 * @param {String} position 棋子所处单元格的方位
 * @returns
 */
function createChess(tdContainer, chessColor, position, number) {
  var span = document.createElement("span");
  //分别对左上右上左下右下进行不同处理
  if (position === "leftTop") {
    var result = chessArray.find(function (item) {
      return (
        Number(tdContainer.getAttribute("column")) === item.positionX &&
        Number(tdContainer.getAttribute("cow")) === item.positionY
      );
    });
    if (result) {
      count--;
      return;
    }
    span.style.left = "-50%";
    span.style.top = "-50%";
    var spanObj = {
      positionX: Number(tdContainer.getAttribute("column")),
      positionY: Number(tdContainer.getAttribute("cow")),
      chessColor: chessColor,
      number: number,
    };
  } else if (position === "rightTop") {
    var result = chessArray.find(function (item) {
      return (
        Number(tdContainer.getAttribute("column")) + 1 === item.positionX &&
        Number(tdContainer.getAttribute("cow")) === item.positionY
      );
    });
    if (result) {
      count--;
      return;
    }
    span.style.left = "50%";
    span.style.top = "-50%";
    var spanObj = {
      positionX: Number(tdContainer.getAttribute("column")) + 1,
      positionY: Number(tdContainer.getAttribute("cow")),
      chessColor: chessColor,
      number: number,
    };
  } else if (position === "leftBottom") {
    var result = chessArray.find(function (item) {
      return (
        Number(tdContainer.getAttribute("column")) === item.positionX &&
        Number(tdContainer.getAttribute("cow")) + 1 === item.positionY
      );
    });
    if (result) {
      count--;
      return;
    }
    span.style.left = "-50%";
    span.style.top = "50%";
    var spanObj = {
      positionX: Number(tdContainer.getAttribute("column")),
      positionY: Number(tdContainer.getAttribute("cow")) + 1,
      chessColor: chessColor,
      number: number,
    };
  } else {
    var result = chessArray.find(function (item) {
      return (
        Number(tdContainer.getAttribute("column")) + 1 === item.positionX &&
        Number(tdContainer.getAttribute("cow")) + 1 === item.positionY
      );
    });
    if (result) {
      count--;
      return;
    }
    span.style.left = "50%";
    span.style.top = "50%";
    var spanObj = {
      positionX: Number(tdContainer.getAttribute("column")) + 1,
      positionY: Number(tdContainer.getAttribute("cow")) + 1,
      chessColor: chessColor,
      number: number,
    };
  }
  span.style.background = chessColor;
  span.setAttribute("x", spanObj.positionX);
  span.setAttribute("y", spanObj.positionY);
  chessArray.push(spanObj);
  tdContainer.appendChild(span);

  checkGameOver();
}

//检测游戏是否结束
function checkGameOver() {
  for (var i = 0; i < chessArray.length; i++) {
    var chess1 = chessArray[i];
    var chess2, chess3, chess4, chess5;

    //行结束
    chess2 = chessArray.find(function (item) {
      return (
        (chess1.positionX - 1 === item.positionX ||
          chess1.positionX + 1 === item.positionX) &&
        chess1.positionY === item.positionY &&
        chess1.chessColor === item.chessColor
      );
    });
    chess3 = chessArray.find(function (item) {
      return (
        (chess1.positionX - 2 === item.positionX ||
          chess1.positionX + 2 === item.positionX) &&
        chess1.positionY === item.positionY &&
        chess1.chessColor === item.chessColor
      );
    });
    chess4 = chessArray.find(function (item) {
      return (
        (chess1.positionX - 3 === item.positionX ||
          chess1.positionX + 3 === item.positionX) &&
        chess1.positionY === item.positionY &&
        chess1.chessColor === item.chessColor
      );
    });
    chess5 = chessArray.find(function (item) {
      return (
        (chess1.positionX - 4 === item.positionX ||
          chess1.positionX + 4 === item.positionX) &&
        chess1.positionY === item.positionY &&
        chess1.chessColor === item.chessColor
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      gameOverDo(chess1, chess2, chess3, chess4, chess5);
    }

    //列结束
    chess2 = chessArray.find(function (item) {
      return (
        (chess1.positionY - 1 === item.positionY ||
          chess1.positionY + 1 === item.positionY) &&
        chess1.positionX === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess3 = chessArray.find(function (item) {
      return (
        (chess1.positionY - 2 === item.positionY ||
          chess1.positionY + 2 === item.positionY) &&
        chess1.positionX === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess4 = chessArray.find(function (item) {
      return (
        (chess1.positionY - 3 === item.positionY ||
          chess1.positionY + 3 === item.positionY) &&
        chess1.positionX === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess5 = chessArray.find(function (item) {
      return (
        (chess1.positionY - 4 === item.positionY ||
          chess1.positionY + 4 === item.positionY) &&
        chess1.positionX === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      gameOverDo(chess1, chess2, chess3, chess4, chess5);
    }

    //对角线结束
    chess2 = chessArray.find(function (item) {
      return (
        chess1.positionY - 1 === item.positionY &&
        chess1.positionX + 1 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess3 = chessArray.find(function (item) {
      return (
        chess1.positionY - 2 === item.positionY &&
        chess1.positionX + 2 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess4 = chessArray.find(function (item) {
      return (
        chess1.positionY - 3 === item.positionY &&
        chess1.positionX + 3 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess5 = chessArray.find(function (item) {
      return (
        chess1.positionY - 4 === item.positionY &&
        chess1.positionX + 4 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      gameOverDo(chess1, chess2, chess3, chess4, chess5);
    }

    chess2 = chessArray.find(function (item) {
      return (
        chess1.positionY + 1 === item.positionY &&
        chess1.positionX - 1 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess3 = chessArray.find(function (item) {
      return (
        chess1.positionY + 2 === item.positionY &&
        chess1.positionX - 2 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess4 = chessArray.find(function (item) {
      return (
        chess1.positionY + 3 === item.positionY &&
        chess1.positionX - 3 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    chess5 = chessArray.find(function (item) {
      return (
        chess1.positionY + 4 === item.positionY &&
        chess1.positionX - 4 === item.positionX &&
        chess1.chessColor === item.chessColor
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      gameOverDo(chess1, chess2, chess3, chess4, chess5);
    }
  }
}

//游戏结束后进行什么处理
function gameOverDo(chess1, chess2, chess3, chess4, chess5) {
  isGameOver = true;
  var span = $$("table span");
  for (var i = 0; i < chessArray.length; i++) {
    for (var k = 0; k < span.length; k++) {
      if (
        span[k].getAttribute("x") == chessArray[i].positionX &&
        span[k].getAttribute("y") == chessArray[i].positionY
      ) {
        span[k].innerText = chessArray[i].number;
      }
    }

    for (var j = 0; j < arguments.length; j++) {
      if (
        arguments[j].positionX == span[i].getAttribute("x") &&
        arguments[j].positionY == span[i].getAttribute("y")
      ) {
        span[i].className = "gameOver";
      }
    }
  }
}
