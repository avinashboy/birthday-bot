let tempData, url = "http://localhost:3333/"
const pushBtn = document.querySelector("#pushBtn")
pushBtn.addEventListener("click", infoMe)
const loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener("click", loginMe)
let tempToken


function loginMe() {
  const inputName = cleanInput($("#inputName").val())
  const inputPassword = cleanInput($("#inputPassword1").val())
  return axios.post(`${url}login`, { inputName, inputPassword }).then(res => { if (res.status === 200) return alert("success", "Login"), $(".loginPage").remove(), tempToken = res.data.auth, $(".mainPage").fadeIn(), $('.logOutBtn').fadeIn(), $("#nameServer").text(`Hi,${res.data.name}`) }).catch(err => alert("danger", err))
}

function logoutBtn() {
  return tempToken = undefined, $(".mainPage,.logOutBtn, .listPage,#nameServer").remove(), $("body").append(`<h1 class="text-center">Successfull logout</h1>`), clickHappend()
}

function alert(className, message) {
  return $('#alertMe').fadeIn(),
    $('#alertMe').html(`<div class="alert alert-${className}" role="alert">${message}</div>`),
    setTimeout(() => { $('#alertMe').fadeOut(1000).empty() }, 4000)
}

function cleanInput(message) {
  return validator.escape(message)
}

function infoMe() {
  const headers = head()
  const name = !validator.isEmpty(cleanInput($("#name").val())) ? cleanInput($("#name").val()).charAt(0).toUpperCase() + cleanInput($("#name").val()).slice(1) : alert("danger", "Please enter the name")
  const day = !isNaN(cleanInput($("#day").val())) ? cleanInput($("#day").val()).length === 1 ? `0${cleanInput($("#day").val())}` : cleanInput($("#day").val()) : alert("danger", "Please enter the number")
  const month = !validator.isEmpty(cleanInput($("#month").val())) ? cleanInput($("#month").val()).split("-")[0] : alert("danger", "Please enter the month")
  const descriptionHead = !validator.isEmpty(cleanInput($("#descriptionHead").val())) ? cleanInput($("#descriptionHead").val()) : "Nil"
  const titleHead = `${month.slice(0, 3)} |`
  const mainHead = `${day}<sup>th</sup> Of ${month}`
  const createdAt = moment().format('LLL');
  if (month === "Open this select menu") return alert("danger", "Please choice month")
  const payLoad = { name, titleHead, descriptionHead, createdAt, mainHead, baseTime: day, month: cleanInput($("#month").val()).split("-").pop() }

  if (checkMonthAndDay(Number(cleanInput($("#month").val()).split("-").pop()), Number(day))) return axios.post(`${url}forIndex`, payLoad, { headers: headers }).then(res => res.status === 201 ? cleanUp(res.data) : alert("danger", "Please try again")).catch(err => alert("danger", err))
  return alert("danger", "Please check properly")
}

function checkMonthAndDay(tempMonth, tempDay) {
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], year = (new Date()).getFullYear();
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;
  return tempDay > 0 && tempDay <= monthLength[tempMonth - 1];
}

function cleanUp(text) {
  return $("#name").val(""),
    $("#day").val(""),
    $("#month").val("Open this select menu"),
    $("#descriptionHead").val(""),
    alert("success", `ID : ${text}`)
}

function showTheList() {
  clickHappend()
  const headers = head()
  $(".mainPage,.loginPage").fadeOut()
  $(".listPage").empty()
  const smallInfo = document.createElement('div')
  smallInfo.setAttribute('class', 'small-info')
  const listPages = document.createElement('div')
  listPages.setAttribute('class', 'listPages')
  $('.listPage').append(smallInfo)
  $('.listPage').append(listPages)
  checkCurrentList()
  let createTable = document.createElement("table")
  createTable.setAttribute("class", "table table-striped mt-2 mb-5 table-sm")
  createTable.setAttribute("id", "tableBook")
  let tHead = createTable.createTHead()
  let tBody = createTable.createTBody()
  let hRow = document.createElement('tr')
  let td = document.createElement('td');
  td.innerHTML = "S.no";
  td.setAttribute("scope", "col")
  hRow.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = "Name";
  td.setAttribute("scope", "col")
  hRow.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = "On";
  td.setAttribute("scope", "col")
  hRow.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = "Create At";
  td.setAttribute("scope", "col")
  hRow.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = "Delete";
  td.setAttribute("scope", "col")
  hRow.appendChild(td);
  tHead.appendChild(hRow)
  createTable.appendChild(tHead)
  createTable.appendChild(tBody)
  $(".listPages").append(createTable)
  try {
    axios.get(`${url}forIndex`, { headers: headers }).then(res => {
      res.data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      tempData = res.data
      if (tempData.length === 0) return $("body").append(`<h1 class="text-center removeMe">No data</h1>`), $(".listPage").remove()
      miniTable(tempData)

    }).catch(err => alert("danger", err))
  } catch (error) {
    console.warn(error)
  }
}

function miniTable(array) {
  document.getElementById("tableBook").children[1].innerHTML = ""
  array.forEach((element, index) => {
    let row = document.createElement('tr');

    let th = document.createElement('th');
    th.innerHTML = index += 1;
    row.appendChild(th);

    let td = document.createElement('td');
    td.innerHTML = element.name;
    row.appendChild(td)

    td = document.createElement('td');
    td.innerHTML = element.mainHead;
    row.appendChild(td)

    td = document.createElement('td');
    td.innerHTML = element.date !== undefined ? moment(element.date).format('lll') : "Nil";
    row.appendChild(td)

    td = document.createElement('td');
    td.innerHTML = `<button type="button" class="btn btn-outline-danger deleteMe" onclick="deleteRow(this)" id="${element._id}&#&${index}&#&${element.name}"><i class="fas fa-trash"></i></button>`
    row.appendChild(td)

    document.getElementById("tableBook").children[1].appendChild(row)
  })

  return
}

function deleteRow(idDelete) {
  const [tempDelete, tempIndex, tempName] = idDelete.id.split("&#&")
  const headers = head()
  axios.delete(`${url}forIndex/${tempDelete}`, { headers: headers }).then(res => res.status === 200 ? alert("success", `${tempName} is deleted`) : alert("danger", "Please try again")).catch(err => alert("danger", err))
  $('#tableBook').on('click', '.deleteMe', function (e) {
    $(this).closest('tr').remove()
    tempData.splice((tempIndex - 1), 1)
    setTimeout(() => { miniTable(tempData), checkCurrentList() }, 1000)
  })
  return
}

function againFrom() {
  $(".listPage,.removeMe").empty()
  clickHappend()
  tempToken === undefined ? $(".loginPage").fadeIn() : $(".mainPage").fadeIn()
  return
}

function clickHappend() {
  return $('#navbarSupportedContent').removeClass("show"), $('.menuBtn ').addClass("collapsed")
}

function checkCurrentList() {
  axios.get(`${url}brithCounter`).then(res => {
    res.data.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    })
    const outerDiv = document.createElement('div')
    outerDiv.setAttribute('class', 'row')
    const h5 = document.createElement('h5')
    h5.innerText = "Current birth list"
    if (res.data.length === 0) h5.innerText = "No current birthday"
    const innerDiv = document.createElement('div')
    innerDiv.setAttribute('class', 'col-sm-4 mt-3 mb-3')
    const ul = document.createElement('ul')
    ul.setAttribute('class', 'list-group list-group-numbered')
    res.data.forEach(element => {
      const li = document.createElement('li')
      li.setAttribute('class', 'list-group-item')
      li.innerHTML = `${element.name} ${element.mainHead}`
      ul.append(li)
    })
    outerDiv.append(h5)
    innerDiv.append(ul)
    outerDiv.append(innerDiv)
    $('.small-info').append(outerDiv)
  })
}

function head() {
  return headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Authorization': tempToken
  }
}
