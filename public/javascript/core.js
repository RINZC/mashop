load=(x = 1)=>{
    if( x == 1 ){
        window.location = "/user";
    } else if ( x == 0) {
        window.location = "/user?out=1"
    }
}

oAlert=(msg, dur, tpy)=>{
    var elem = document.createElement("div");
    var textElem = document.createTextNode("hiii")
    elem.appendChild(textElem)
    document.getElementById("alertBox").appendChild(elem);
}

menu=(ch=0)=>{
    // if (ch == 0){
    //     window.location = "/"
    // }
    switch (ch) {
        case 0:
            return window.location = "/"
        case 1:
            return window.location = "/user"
    }
    // แก้ละ ok na
}