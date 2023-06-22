const bonusSound = new Audio("music/bonus.mp3");
function Rock() {
  bonusSound.play();
  var com, you = "Rock";
  var a = ["Paper", "Scissor"];
  var r = Math.floor(Math.random() * a.length);
  com = a[r];

  const t1 = setTimeout(ch, 100);
  function ch() {
    $(".conta").css("display", "grid")
  }
  const t2 = setTimeout(ch2, 1900);
  function ch2() {
    $(".conta").css("display", "none")
  }

  const timeout = setTimeout(check, 2000);
  function check() {
    if (you == "Rock" && com == "Scissor") {
      alert("WOW! You have Won the game.\n\nyour choice = " + you + " & computer choice = " + com)

    }
    else if (you == "Rock" && com == "Paper") {
      alert("Oho! You have Lost the game.\n\nyour choice = " + you + " & computer choice = " + com)
    }
  }

}
function Paper() {
  bonusSound.play();
  var com, you = "Paper";
  var a = ["Rock", "Scissor"];
  var r = Math.floor(Math.random() * a.length);
  com = a[r];
  const t1 = setTimeout(ch, 100);
  function ch() {
    $(".conta").css("display", "grid")
  }
  const t2 = setTimeout(ch2, 1900);
  function ch2() {
    $(".conta").css("display", "none")
  }
  const timeout = setTimeout(check, 2000);
  function check() {
    if (you == "Paper" && com == "Rock") {
      alert("WOW! You have Won the game.\n\nyour choice = " + you + " & computer choice = " + com)
    }
    else if (you == "Paper" && com == "Scissor") {
      alert("Oho! You have Lost the game.\n\nyour choice = " + you + " & computer choice = " + com)
    }
  }
}
function Scissor() {
  bonusSound.play();
  var com, you = "Scissor";
  var a = ["Rock", "Paper"];
  var r = Math.floor(Math.random() * a.length);
  com = a[r];
  const t1 = setTimeout(ch, 100);
  function ch() {
    $(".conta").css("display", "grid")
  }
  const t2 = setTimeout(ch2, 1900);
  function ch2() {
    $(".conta").css("display", "none")
  }
  const timeout = setTimeout(check, 2000);
  function check() {
    if (you == "Scissor" && com == "Paper") {
      alert("WOW! You have Won the game.\n\nyour choice = " + you + " & computer choice = " + com)
    }
    else if (you == "Scissor" && com == "Rock") {
      alert("Oho! You have Lost the game.\n\nyour choice = " + you + " & computer choice = " + com)
    }
  }
}
