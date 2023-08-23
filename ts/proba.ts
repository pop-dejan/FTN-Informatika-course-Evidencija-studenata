let studenti: Student[] = [];
let aktivanStudent: Student = null;

function promeniAktivnog(selekt: HTMLSelectElement){

    aktivanStudent = studenti.filter((elem) => elem.jmbg == Number(selekt.value))[0]; 
    aktivanStudent.refreshPredmeti();
}

class Predmet {
    naziv: string;
    ocena: number;
    constructor(naziv: string, ocena: number){
        this.ocena = ocena;
        this.naziv = naziv;
    }
}

class Student {
    private _ime: string;
    private _prezime: string;
    private _jmbg: number;
    private _predmeti: Predmet[]; 

    constructor(ime: string, prezime: string, jmbg: number) {
        this._ime = ime;
        this._prezime = prezime;
        this._jmbg = jmbg;
        this._predmeti = []; 

        
    }

    get ime(): string{
        return this._ime;
    }

    set ime(param: string) {
        this._ime = param;
    }

    get prezime(): string{
        return this._prezime;
    }

    set prezime(param: string) {
        this._prezime = param;
    }

    get jmbg(): number{
        return this._jmbg;
    }

    set jmbg(param: number) {
        this._jmbg = param;
    }

    get predmeti(): Predmet[] {
        return this._predmeti;
    }

    dodajPredmet(predmet: Predmet): void {
        this._predmeti.push(predmet); 
        this.refreshPredmeti(); 
    }

    refreshPredmeti(): void {
        let predmetiOut: HTMLElement = document.getElementById("predmeti"); 
        let outString: string = "";
        for(let i = 0; i < this._predmeti.length; i++){
            outString += `Predmet: ${this._predmeti[i].naziv} <br/>Ocena: ${this._predmeti[i].ocena} <br/><br/>`;
        }
        predmetiOut.innerHTML = outString;

    }

    getProsek(): number {
        return this._predmeti.reduce((prev, next) => prev + next.ocena, 0) / this._predmeti.length;
    }
    
}


function wireEvents(): void {
    
    document.getElementById("dodajPredmet").addEventListener("click", ()=>{
        let naziv: HTMLInputElement = document.getElementById("naziv") as HTMLInputElement; 
        let ocena: HTMLInputElement = document.getElementById("ocena") as HTMLInputElement;
        let p: Predmet = new Predmet(naziv.value, Number(ocena.value)); 
        aktivanStudent.dodajPredmet(p); 
    });

    
    document.getElementById("izracunajProsecnuOcenu").addEventListener("click", ()=>{
        let prosekOut: HTMLElement = document.getElementById("prosecnaOcena");
        
        prosekOut.innerHTML = `Prosecna ocena za studenta: ${aktivanStudent.ime} ${aktivanStudent.prezime} je ${aktivanStudent.getProsek()}`;

    });


}


window.onload = function() {
    initStudenti.forEach((elem) => {
        let s: Student = new Student(elem.ime, elem.prezime, Number(elem.jmbg));
        elem.predmeti.forEach((elem)=>{
            let p: Predmet = new Predmet(elem.naziv, elem.ocena);
            s.dodajPredmet(p);
        });
        studenti.push(s);
        if(aktivanStudent == null){
            aktivanStudent = s;
        }
    });
    if(QueryString["ime"] != null){
        var student = new Student(QueryString["ime"], QueryString["prezime"], Number(QueryString["jmbg"]));
        studenti.push(student);    
    }
    let selekt: HTMLElement = document.getElementById("student");
    let output: string = "";
    for(let i = 0; i < studenti.length; i++){
        let optionElem = `<option value=${studenti[i].jmbg}>${studenti[i].ime} ${studenti[i].prezime}</option>`;
        output += optionElem;         
    }
    selekt.innerHTML = output;
    aktivanStudent.refreshPredmeti();
    wireEvents();
}


var initStudenti = [
    {
        ime: "Pera",
        prezime: "Peric",
        jmbg: "1123456789000",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 10
            },
            {
                naziv: "Predmet2",
                ocena: 8
            },
            {
                naziv: "Predmet3",
                ocena: 9
            },
            {
                naziv: "Predmet4",
                ocena: 9
            }
        ]
    },
    {
        ime: "Mika",
        prezime: "Mikic",
        jmbg: "1123456789001",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 7
            },
            {
                naziv: "Predmet2",
                ocena: 10
            },
            {
                naziv: "Predmet3",
                ocena: 8
            }
        ]
    }
]

var QueryString = function () {
 
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i < vars.length;i++) {
    var pair = vars[i].split("=");
        
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

