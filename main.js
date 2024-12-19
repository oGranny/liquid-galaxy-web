let port = localStorage.getItem("port");
let host = localStorage.getItem("host")
let username = localStorage.getItem("username");
let password = localStorage.getItem("password");
let machines = localStorage.getItem("machines");

let tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");
const connect = document.getElementById("submit_btn");
const kml_lake = document.getElementById("kml_lake");
const kml_island = document.getElementById("kml_island");
const remove_kml = document.getElementById("remove_kml");
const show_logo = document.getElementById("show_logo");
const remove_logo = document.getElementById("remove_logo");

function showSnackbar(message) {
    var snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.remove('hidden');
    setTimeout(function() {
        snackbar.classList.add('hidden');
    }, 3000);
}

async function excecute(command) {
    try {
        const response = await fetch(`http://${host}:${port}/excecute.php`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command: command })
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

async function upload(link, path) {
    try {
        const response = await fetch(`http://${host}:${port}/upload.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ link: link, path: path })
        });
        const data = await response.json();
        if (data.success) {
            showSnackbar("Upload successful");
        } else {
            showSnackbar("Upload failed");
        }
    } catch (error) {
        console.error('Error:', error);
        showSnackbar("Error during upload");
    }
    
}

async function checkConnection(host, port) {
    try {
        const response = await fetch(`http://${host}:${port}/excecute.php`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command: 'echo 0' })
        });
        const data = await response.json();
        console.log(data);
        
        if (data.output[0] === "0") return true;
        else return false;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

async function showKml(content_link, name, lat, lon, range) {
    try{    
        await upload(content_link, `/var/www/html/${name}.kml`);
        await excecute(`echo "http://lg1:81/${name}.kml" > /var/www/html/kmls.txt`);
        await excecute(`su lg; echo "flytoview=<LookAt><longitude>${lat}</longitude><latitude>${lon}</latitude><range>${range}</range><tilt>${0}</tilt><heading>${0}</heading><gx:altitudeMode>relativeToGround</gx:altitudeMode></LookAt>" > /tmp/query.txt`)
        await excecute('chown lg:lg /tmp/query.txt');
    }catch(e){
        console.log(e);
        showSnackbar(`Error: ${e}`);
    }
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("border-blue-400", "text-blue-400"));
        contents.forEach(content => content.classList.add("hidden"));
        
        tab.classList.add("border-blue-400", "text-blue-400");
        contents[index].classList.remove("hidden");
    });
});

connect.addEventListener("click", async () => {
    port = document.querySelector("#web-port").value;
    host = document.querySelector("#host").value;
    username = document.querySelector("#username").value;
    password = document.querySelector("#password").value;
    machines = document.querySelector("#machines").value;

    console.log("Web Host:", host);
    console.log("Port:", port);
    localStorage.setItem('host', host);
    localStorage.setItem('port', port);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('machines', machines);
    let res = await checkConnection(host, port);
    console.log(res);
    

    if (res) showSnackbar("Connected");
    else showSnackbar("Not able to connect");    
});

kml_lake.addEventListener("click", async () => {
    // await showKml("", "lake", -87.77054184944622, 47.7745257417786, 705696.659457);
    await showKml("https://raw.githubusercontent.com/oGranny/liquid_galaxy_example/master/assets/kmls/lake_superior.kml", "lake", -87.77054184944622, 47.7745257417786, 705696.659457);
})

kml_island.addEventListener("click", async () => {
    await showKml("https://raw.githubusercontent.com/oGranny/liquid_galaxy_example/master/assets/kmls/island_kerguelen.kml", "island", 69.39801887494792, -49.2962233613581, 352848.3297285);
});

remove_kml.addEventListener("click", async () => {
    await excecute(`> /var/www/html/kmls.txt`);
});

show_logo.addEventListener("click", async () => {
    await excecute(`echo "<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document><name>LG_LOGO</name><open>1</open><Folder><ScreenOverlay><Icon><href>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXmdNgBTXup6bdWew5RzgCmC9pPb7rK487CpiscWB2S8OlhwFHmeeACHIIjx4B5-Iv-t95mNUx0JhB_oATG3-Tq1gs8Uj0-Xb9Njye6rHtKKsnJQJlzZqJxMDnj_2TXX3eA5x6VSgc8aw/s320-rw/LOGO+LIQUID+GALAXY-sq1000-+OKnoline.png</href></Icon><color>ffffffff</color><rotationXY x="0" y="0" xunits="fraction" yunits="fraction"/></ScreenOverlay></Folder></Document></kml>" > /var/www/html/kml/slave_3.kml`);
});

remove_logo.addEventListener("click", async () => {
    await excecute(`echo "<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document></Document></kml>" > /var/www/html/kml/slave_3.kml`);
});