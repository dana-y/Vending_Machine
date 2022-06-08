//JSON setting
var requestURL = ''; // JSON 데이터 받아올 url
    var request = new XMLHttpRequest();
    request.open('GET', requestURL); // requestURL로 보냄
    request.responseType = 'json';
    request.send();
    
    request.onload = function() {
    var superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
    }

    // JSON에서 받아올 데이터 설정해줌
    const drinks = [  
      {
        "name" : "Original_Cola",
        "price" : 1000
      }, 
      {
        "name" : "Violet_Cola",
        "price" : 1000
      }, 
      {
        "name" : "Yellow_Cola",
        "price" : 1000
      },
      {
        "name" : "Cool_Cola",
        "price" : 1000
      }, 
      {
        "name" : "Green_Cola",
        "price" : 1000
      }, 
      {
        "name" : "Orange_Cola",
        "price" : 1000
      }
    ]
    
    // 변수
    const colaCart = document.querySelector(".cola-cart");
    const menu = document.querySelector(".cola-menu");
    let nowMoney = document.querySelector(".now-money strong").innerText;
    nowMoney = 0;
    let nowMyMoney = 30000;
    
    const changBtn = document.querySelector(".return-changes")

    // drink 넣는 함수
    const makeDrink = function(addThisCola, parent){
      // const item = this.item;
      // const parent = this.parent;
      // 여기 이 친구들 들어가면 왜 안될까?

      const liElement = document.createElement("li");
      const buttonElement = document.createElement("button");
      const imgElement = document.createElement("img");
      const strongElement = document.createElement("strong");
      const spanElement = document.createElement("span");
  
      imgElement.setAttribute("src", `./images/${addThisCola.name}.svg`);
  
      strongElement.innerText = `${addThisCola.name}`
      strongElement.classList.add("cola-btn-name");
  
      spanElement.innerText = `${addThisCola.price}`;
      spanElement.classList.add("cola-btn-price");
  
      buttonElement.classList.add("cola-button")
      buttonElement.appendChild(imgElement);
      buttonElement.appendChild(strongElement);
      buttonElement.appendChild(spanElement);
  
      liElement.appendChild(buttonElement);
      parent.appendChild(liElement);  
    }
    
    // cola-cart용 drink 넣는 함수
    const makeColaInCart = function(name, parent){
      const count = 1;

      const liElement = document.createElement("li");
      liElement.classList.add("picked-cola")

      const imgElement = document.createElement("img");
      imgElement.setAttribute("src", `./images/${name}.svg`);
      imgElement.classList.add("picked-cola-img");
      liElement.appendChild(imgElement);

      const strongElement = document.createElement("strong");
      strongElement.innerText = `${name}`
      strongElement.classList.add("picked-cola-name")
      liElement.appendChild(strongElement);

      const spanElement = document.createElement("span");
      spanElement.classList.add("cola-quantity");
      spanElement.innerText = count;
      liElement.appendChild(spanElement);
      
      // liElement.classList.add("ir");
      liElement.classList.add(name);
      parent.appendChild(liElement);
    }

    // 자판기 기능구현 클래스
    class Manager {
      constructor (){
    
      }
      menuSetting(){
        drinks.forEach((item) => {
          makeDrink(item, menu);
        })
      }

      picking () {
        
        const menuColas = menu.querySelectorAll("li");

        menuColas.forEach(e => {
          e.addEventListener("click", e => {

            const colasInCart = colaCart.querySelectorAll("li");

            const clickedColaName = e.target
                  .closest("button")
                  .querySelector("strong")
                  .innerText;
            const colaInCart = colaCart.querySelector(`.${clickedColaName}`);
            if(!!colaInCart) {
              colaInCart.querySelector("span").innerText++;
            } else {
              makeColaInCart(clickedColaName, colaCart);
            }
          });

        })
      }
      putMoney () {
        const putBtn = document.querySelector(".input-btn");

        putBtn.addEventListener("click", e => {
          if(document.querySelector(".input-money-txt").value == ""){
            window.alert("입금 하실 금액을 입력하세요")
          } else {

            const nowInputMoney = +document.querySelector(".input-money-txt").value;
            
            nowMyMoney -= nowInputMoney;
            nowMoney += nowInputMoney;
            
            document.querySelector(".my-pocket-money").innerText = nowMyMoney;
            document.querySelector(".now-money strong").innerText = nowMoney;
            document.querySelector(".input-money-txt").value = ""
          }
        })
      }

      changing() {
        changBtn.addEventListener("click", () => {
          if(nowMoney <= 0) {
            window.alert("반환 할 돈이 없습니다.");
          } else {

            nowMyMoney += +nowMoney;
            nowMoney = 0;

            document.querySelector(".my-pocket-money").innerText = nowMyMoney;
            document.querySelector(".now-money strong").innerText = nowMoney;
          } 
      })
      }

      getCartCola() {

      }
    }

    // 인스턴스 생성
    const manager = new Manager();

    // 기본 세팅
    manager.menuSetting();
    manager.picking();
    manager.putMoney();
    manager.changing();
    document.querySelector(".my-pocket-money").innerText = nowMyMoney;
    document.querySelector(".now-money strong").innerText = nowMoney;
