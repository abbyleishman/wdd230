const date = {month:"long", day:"numeric", year:"numeric"};
    document.getElementById("date").textContent = new Date().toLocaleDateString("en-US", date);   
