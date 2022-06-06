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
    const nowMoney = document.querySelector(".now-money");

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

    // 기능 넣는 클래스
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
        
      }

      changing() {
    
      }
    }

    // 인스턴스 생성
    const manager = new Manager();

    // 기본 세팅
    manager.menuSetting();
    manager.picking();

    // cola cart로
    const colaButton = document.querySelectorAll(".cola-button");

