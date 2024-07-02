import { Details } from "./details.js";
import { Ui } from "./Ui.js";
export class Games {
    constructor() {
        this.getGames("mmorpg");

        const links = document.querySelectorAll(".menu a");

        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", (e) => {
                document.querySelector(".menu .active").classList.remove("active");
                e.target.classList.add("active");
                this.getGames(e.target.dataset.category);
            });
        }
        this.ui = new Ui();
        this.details = new Details();
    }

    async getGames(category) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none");
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const response = await api.json();

        this.ui.displayDataGame(response);
        this.startEvent();
        loading.classList.add("d-none");
    }

    startEvent() {
        const items = document.querySelectorAll(".card");
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", () => {
                const id = items[i].dataset.id;
                this.details.showDetails(id);
            });
        }

        //    showDetails(idGame) {
        //       const details = new Details(idGame);
        //       document.querySelector(".games").classList.add("d-none");
        //       document.querySelector(".details").classList.remove("d-none");
        //    }
    }
}
