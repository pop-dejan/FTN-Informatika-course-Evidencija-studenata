var studenti = [];
var aktivanStudent = null;
function promeniAktivnog(selekt) {
    
    aktivanStudent = studenti.filter(function (elem) { return elem.jmbg == Number(selekt.value); })[0];
    aktivanStudent.refreshPredmeti();
}
var Predmet = /** @class */ (function () {
    function Predmet(naziv, ocena) {
        this.ocena = ocena;
        this.naziv = naziv;
    }
    return Predmet;
}());
var Student = /** @class */ (function () {
    function Student(ime, prezime, jmbg) {
        this._ime = ime;
        this._prezime = prezime;
        this._jmbg = jmbg;
        this._predmeti = []; 
    }
    Object.defineProperty(Student.prototype, "ime", {
        
        get: function () {
            return this._ime;
        },
        set: function (param) {
            this._ime = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "prezime", {
        get: function () {
            return this._prezime;
        },
        set: function (param) {
            this._prezime = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "jmbg", {
        get: function () {
            return this._jmbg;
        },
        set: function (param) {
            this._jmbg = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "predmeti", {
        get: function () {
            return this._predmeti;
        },
        enumerable: true,
        configurable: true
    });
    Student.prototype.dodajPredmet = function (predmet) {
        this._predmeti.push(predmet); 
        this.refreshPredmeti(); 
    };
    Student.prototype.refreshPredmeti = function () {
        var predmetiOut = document.getElementById("predmeti"); 
        var outString = "";
        for (var i = 0; i < this._predmeti.length; i++) {
            outString += "Predmet: " + this._predmeti[i].naziv + " <br/>Ocena: " + this._predmeti[i].ocena + " <br/><br/>";
        }
        predmetiOut.innerHTML = outString;
    };
    Student.prototype.getProsek = function () {
        return this._predmeti.reduce(function (prev, next) { return prev + next.ocena; }, 0) / this._predmeti.length;
    };
    return Student;
}());

function wireEvents() {
    
    document.getElementById("dodajPredmet").addEventListener("click", function () {
        var naziv = document.getElementById("naziv"); 
        var ocena = document.getElementById("ocena");
        var p = new Predmet(naziv.value, Number(ocena.value)); 
        aktivanStudent.dodajPredmet(p); 
    });
    
    document.getElementById("izracunajProsecnuOcenu").addEventListener("click", function () {
        var prosekOut = document.getElementById("prosecnaOcena");
      
        prosekOut.innerHTML = "Prosecna ocena za studenta: " + aktivanStudent.ime + " " + aktivanStudent.prezime + " je " + aktivanStudent.getProsek();
    });
}

window.onload = function () {
    initStudenti.forEach(function (elem) {
        var s = new Student(elem.ime, elem.prezime, Number(elem.jmbg));
        elem.predmeti.forEach(function (elem) {
            var p = new Predmet(elem.naziv, elem.ocena);
            s.dodajPredmet(p);
        });
        studenti.push(s);
        if (aktivanStudent == null) {
            aktivanStudent = s;
        }
    });
    if (QueryString["ime"] != null) {
        var student = new Student(QueryString["ime"], QueryString["prezime"], Number(QueryString["jmbg"]));
        studenti.push(student);
    }
    var selekt = document.getElementById("student");
    var output = "";
    for (var i = 0; i < studenti.length; i++) {
        var optionElem = "<option value=" + studenti[i].jmbg + ">" + studenti[i].ime + " " + studenti[i].prezime + "</option>";
        output += optionElem;
    }
    selekt.innerHTML = output;
    aktivanStudent.refreshPredmeti();
    wireEvents();
};
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
];
var QueryString = function () {
    
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
      
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            
        }
        else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
          
        }
        else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();
//# sourceMappingURL=proba.js.map