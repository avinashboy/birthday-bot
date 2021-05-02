// 2021/02/20 21:00:00
let currentData = moment().format('L').split("/"), tempArr = []
const url = "http://localhost:3333/brithCounter"

function alert(className, message) {
  return $('#alertMe').fadeIn(),
    $('#alertMe').html(`<div class="alert alert-${className} demo" role="alert">${message}</div>`),
    setTimeout(() => { $('#alertMe').fadeOut(1000).empty() }, 4000)
}

axios.get(url).then(res => {
  res.data.sort((a, b) => Number(a.baseTime) - Number(b.baseTime))
  console.log('res:', res.data)
  if (res.data.length === 0) return $("#mainHead1").text("No data....")
  if (res.data.length === 1) return basicInit(res.data[0], currentData[currentData.length - 1]), $("#mainHead1").remove()
  for (let i = 0; i < res.data.length - 1; i++) {
    console.log("index", i)
    $("#mainHead1").remove()
    if ((+res.data[0].baseTime) !== (+res.data[1].baseTime)) {
      basicInit(res.data[0], currentData[currentData.length - 1])
    }
    else if ((+res.data[i].baseTime) === (+res.data[i + 1].baseTime)) {
      tempArr.push(res.data[i].id)
      tempArr.push(res.data[i+1].id)
      res.data[i].name = getNames(tempArr.filter(function(item, pos) {return tempArr.indexOf(item) == pos;}), res.data).join(",")
      res.data[i].descriptionHead = "Nil"
      basicInit(res.data[i], currentData[currentData.length - 1])
    } else if ((+res.data[i].baseTime) !== (+res.data[i + 1].baseTime)) {
      tempArr = []
      break
    }
  }

}).catch(err => alert("danger", err))

function getNames(arr,data){
  let tempArray = []
  for(let i = 0; i< arr.length ; i++){
    for(let j = 0 ; j< data.length; j++){
      if(arr[i] === data[j].id){
        console.log(data[j])
        tempArray.push(data[j].name)
      }
    }
  }
  return tempArray
}

function basicInit(xData, year) {
  let { titleHead, descriptionHead, mainHead, baseTime, month, name } = xData
  $("#demo").text(name)
  $("#demo2").text(descriptionHead !== 'Nil' ? descriptionHead : $("#demo2").remove())
  document.querySelector('meta[name="og:description"]').setAttribute("content", descriptionHead);
  document.querySelector('meta[name="og:title"]').setAttribute("content", `${titleHead} ${year}`);
  document.title = `${titleHead} ${year}`
  document.getElementById('mainHead').innerHTML = mainHead

  $('#countdown').countdown(`${year}/${month}/${baseTime.trim()}`, function (event) {
    $(this).html(
      event.strftime(
        '<div class= "days" > \
              <div class="c-number">' +
        '%D' +
        '</div>days</div > \
              <div class="hours"> \
            <div class="c-number">' +
        '%H' +
        '</div>hours</div> \
              <div class="minutes"> \
            <div class="c-number">' +
        '%M' +
        '</div>minutes</div> \
              <div class="seconds"> \
            <div class="c-number">' +
        '%S' +
        '</div>seconds</div> \
              <div class="left">LEFT</div>\
          </div >'
      )
    );
  });

}
