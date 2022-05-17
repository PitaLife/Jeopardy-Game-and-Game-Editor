var newLines = new Array();
var lines;
var categoryLabel;
function editFile(newFile) {
    console.log("edit file");
    hideElement("fileUpload");
    if (newFile == false){
        document.getElementById("editingTitle").innerHTML = "Editing \"" + String(lines[0]) + "\"";
    }
    for (var i = 1; i <= 6; i++) {
        categoryLabel = document.getElementById("catLabel" + String(i));
        console.log(categoryLabel);
        if (newFile == false && typeof lines[i] !== "undefined"){
            categoryLabel.innerHTML = String(lines[i]);
            console.log("assigning default values");
            for (var a = 0; a < 67; a++){
                if (typeof lines[a] !== "undefined"){
                    console.log(lines[a]);
                    document.getElementById(String(a + 1)).setAttribute("value", lines[a]);
                }
            }
        }
        else{
            document.getElementById("editingTitle").innerHTML = "Editing <i>\"Unnamed\"</i>";
            categoryLabel.innerHTML = "Category " + String(i);
        }
    }
    showElement("editFile");
}
function hideElement(ID) {
    console.log("hide");
    document.getElementById(ID).setAttribute("style", "display: none;");
}
function showElement(ID) {
    document.getElementById(ID).style.display = "block";
}
function downloadFile() {
    for (var i = 1; i <= 67; i++) {
        console.log(i);
        newLines[i - 1] = document.getElementById(String(i)).value;
    }
    window.URL = window.URL || window.webkitURL;
    var fileName = String(newLines[0]);
    var fileText = String(newLines[0]);
    for (var i = 1; i < newLines.length; i++) {
        fileText = fileText + "\n" + newLines[i];
    }
    console.log(fileText);
    var gameFile = new Blob([fileText], { type: "text/plain" });
    console.log(gameFile);
    var fileLink = document.createElement("a");
    //document.body.appendToChild(fileLink);
    console.log(fileLink);
    fileLink.setAttribute("id", "downloadLink");
    fileLink.setAttribute("href", window.URL.createObjectURL(gameFile));
    fileLink.setAttribute("download", fileName);
    fileLink.click();
    fileLink.remove();
    hideElement("editFile");
    showElement("fileUpload");
}
function updateCategories(id){
    var catTitle = document.getElementById(id);
    var catLabel = document.getElementById("catLabel" + String(id - 1));
    if (catTitle.value == ""){
        catLabel.innerHTML = "<i>Unnamed Category</i>";
        console.log("unnamed categories");
    }
    else{
        catLabel.innerHTML = catTitle.value;
        console.log("updated categories to");
        console.log(String(catTitle.value));
    }
}
function back(){
    hideElement("editFile");
    showElement("fileUpload");
}
window.onload = function () {
    var x = 5;
    for(var i=2;i<=7;i++){
        var labelId = document.getElementById(String(i))
        labelId.setAttribute("onchange", `updateCategories(${i})`);
        console.log(labelId);
        console.log(`updateCategories(${i})`);
    }
    hideElement("editFile");
    document.getElementById("uploadFile").onchange = function () {
        console.log(this.files[0]);
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
            console.log("reading file");
            // Entire file
            console.log(this.result);
            // By lines
            lines = this.result.split('\n');
            editFile(false);
        };
        console.log("about to read file");
        reader.readAsText(file);
        //console.log(lines[1]);
    };
    function showTable(ID) {
        var x = document.getElementById(ID);
        x.style.display = "table";
    }
    document.getElementById("1").onchange = function () {
        console.log(this.value);
        if (this.value) {
            document.getElementById("editingTitle").innerHTML = "Editing \"" + String(this.value) + "\"";
        }
        else {
            console.log("unnamed");
            document.getElementById("editingTitle").innerHTML = "Editing <i>\"" + "Unnamed" + "\"</i>";
        }
    };
}