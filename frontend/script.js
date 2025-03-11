const userForm = document.getElementById("user-form");
const userList = document.getElementById("user-list");

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    try {
        await axios.post("http://localhost:5000/api/add-user", { name, email, phone });

        userForm.reset();
        fetchUsers(); 
    } catch (error) {
        console.error("Error adding user:", error);
    }
});


async function fetchUsers() {
    try {
        const response = await axios.get("http://localhost:5000/api/users");
        const users = response.data;

        userList.innerHTML = ""; 

        users.forEach(user => {
            const li = document.createElement("li");
            li.innerHTML = `${user.name} - ${user.email} - ${user.phone} 
                            <button onclick="editUser('${user.id}', '${user.name}', '${user.email}', '${user.phone}')">Edit</button>
                            <button onclick="deleteUser('${user.id}')">Delete</button>`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function deleteUser(userId) {
    try {
        await axios.delete(`http://localhost:5000/api/user/${userId}`);
        fetchUsers(); 
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

async function editUser(userId, currentName, currentEmail, currentPhone) {
    const newName = prompt("Enter new name:", currentName);
    const newEmail = prompt("Enter new email:", currentEmail);
    const newPhone = prompt("Enter new phone:", currentPhone);

    if (!newName || !newEmail || !newPhone) return;

    try {
        await axios.put(`http://localhost:5000/api/user/${userId}`, { name: newName, email: newEmail, phone: newPhone });
        fetchUsers();
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

fetchUsers();
