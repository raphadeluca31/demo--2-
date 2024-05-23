document.addEventListener('DOMContentLoaded', () => {
    showForm('cidade');
});

function showForm(formType) {
    const formContainer = document.getElementById('form-container');
    const tabs = document.querySelectorAll('.tabs button');

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    switch (formType) {
        case 'cidade':
            document.querySelector('.tabs button:nth-child(1)').classList.add('active');
            formContainer.innerHTML = getCidadeForm();
            break;
        case 'pais':
            document.querySelector('.tabs button:nth-child(2)').classList.add('active');
            formContainer.innerHTML = getPaisForm();
            break;
        case 'carro':
            document.querySelector('.tabs button:nth-child(3)').classList.add('active');
            formContainer.innerHTML = getCarroForm();
            break;
    }
}

function showList() {
    const modal = document.getElementById('modal');
    const listContainer = document.getElementById('list-container');
    const activeTab = document.querySelector('.tabs button.active').textContent.toLowerCase();

    listContainer.innerHTML = ''; // Limpa a lista

    fetch(`/${activeTab}s`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const listItem = document.createElement('div');
                listItem.className = 'list-item';
                listItem.innerHTML = `
                    <span>${formatItemData(item)}</span>
                    <button class="edit-button" onclick="showEditForm('${activeTab}', ${item.id})">
                        Editar
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABuT0huAAAAVUlEQVQYlWP8//8/Azb4+Pj/gYGBcRsbG1z9/v3YxsbG/g/ExMS/JGakAlaUATZofBWRNkWkBFJQUysC1AGWBhPJUH5tB8ACmDJnygAaBqAAAAAElFTkSuQmCC"/>
                    </button>
                    <button class="delete-button" onclick="deleteItem('${activeTab}', ${item.id})">
                        Excluir
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABuT0huAAAAVUlEQVQYlWP8//8/Azb4+Pj/gYGBcRsbG1z9/v3YxsbG/g/ExMS/JGakAlaUATZofBWRNkWkBFJQUysC1AGWBhPJUH5tB8ACmDJnygAaBqAAAAAElFTkSuQmCC"/>
                    </button>`;
                listContainer.appendChild(listItem);
            });
            modal.style.display = 'flex';
        })
        .catch(error => {
            console.error('Erro ao buscar lista:', error);
        });
}

function formatItemData(item) {
    let formatted = '';
    for (const key in item) {
        formatted += `<strong>${key}:</strong> ${item[key]}<br>`;
    }
    return formatted;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
}

function showEditForm(endpoint, id) {
    const editModal = document.getElementById('edit-modal');
    const editFormContainer = document.getElementById('edit-form-container');

    fetch(`/${endpoint}s/${id}`)
        .then(response => response.json())
        .then(data => {
            editFormContainer.innerHTML = getEditForm(endpoint, id, data);
            editModal.style.display = 'flex';
        })
        .catch(error => {
            console.error('Erro ao buscar item para edição:', error);
        });
}

function getEditForm(endpoint, id, data) {
    let formContent = '';

    switch (endpoint) {
        case 'cidade':
            formContent = `
                <form onsubmit="submitEditForm(event, '${endpoint}', ${id})">
                    <div class="form-group">
                        <label for="id">ID:</label>
                        <input type="number" id="id" name="id" value="${data.id}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" value="${data.nome}" required>
                    </div>
                    <div class="form-group">
                        <label for="estado">Estado:</label>
                        <input type="text" id="estado" name="estado" value="${data.estado}" required>
                    </div>
                    <div class="form-group">
                        <label for="pais">País:</label>
                        <input type="text" id="pais" name="pais" value="${data.pais}" required>
                    </div>
                    <div class="form-group">
                        <label for="populacao">População:</label>
                        <input type="number" id="populacao" name="populacao" value="${data.populacao}" required>
                    </div>
                    <button type="submit">Atualizar Cidade</button>
                </form>
            `;
            break;
        case 'pais':
            formContent = `
                <form onsubmit="submitEditForm(event, '${endpoint}', ${id})">
                    <div class="form-group">
                        <label for="id">ID:</label>
                        <input type="number" id="id" name="id" value="${data.id}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" value="${data.nome}" required>
                    </div>
                    <div class="form-group">
                        <label for="continente">Continente:</label>
                        <input type="text" id="continente" name="continente" value="${data.continente}" required>
                    </div>
                    <div class="form-group">
                        <label for="capital">Capital:</label>
                        <input type="text" id="capital" name="capital" value="${data.capital}" required>
                    </div>
                    <div class="form-group">
                        <label for="populacao">População:</label>
                        <input type="number" id="populacao" name="populacao" value="${data.populacao}" required>
                    </div>
                    <button type="submit">Atualizar País</button>
                </form>
            `;
            break;
        case 'carro':
            formContent = `
                <form onsubmit="submitEditForm(event, '${endpoint}', ${id})">
                    <div class="form-group">
                        <label for="id">ID:</label>
                        <input type="number" id="id" name="id" value="${data.id}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="modelo">Modelo:</label>
                        <input type="text" id="modelo" name="modelo" value="${data.modelo}" required>
                    </div>
                    <div class="form-group">
                        <label for="marca">Marca:</label>
                        <input type="text" id="marca" name="marca" value="${data.marca}" required>
                    </div>
                    <div class="form-group">
                        <label for="ano">Ano:</label>
                        <input type="number" id="ano" name="ano" value="${data.ano}" required>
                    </div>
                    <div class="form-group">
                        <label for="categoria">Categoria:</label>
                        <input type="text" id="categoria" name="categoria" value="${data.categoria}" required>
                    </div>
                    <div class="form-group">
                        <label for="pais">País:</label>
                        <input type="text" id="pais" name="pais" value="${data.pais}" required>
                    </div>
                    <button type="submit">Atualizar Carro</button>
                </form>
            `;
            break;
    }

    return formContent;
}

function submitEditForm(event, endpoint, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const json = JSON.stringify(Object.fromEntries(formData));
    fetch(`/${endpoint}s/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(response => response.json())
    .then(data => {
        alert('Atualizado com sucesso!');
        closeEditModal();
        showList();
    })
    .catch(error => {
        alert('Erro ao atualizar!');
    });
}

function submitForm(event, endpoint) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const json = JSON.stringify(Object.fromEntries(formData));
    fetch(`/${endpoint}s`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(response => response.json())
    .then(data => {
        alert('Adicionado com sucesso!');
    })
    .catch(error => {
        alert('Erro ao adicionar!');
    });
}

function deleteItem(endpoint, id) {
    fetch(`/${endpoint}s/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Item excluído com sucesso!');
            showList();
        } else {
            alert('Erro ao excluir o item!');
        }
    })
    .catch(error => {
        alert('Erro ao excluir o item!');
    });
}

// Funções para obter os formulários (getCidadeForm, getPaisForm, getCarroForm)
function getCidadeForm() {
    return `
        <form onsubmit="submitForm(event, 'cidade')">
            <div class="form-group">
                <label for="id">ID:</label>
                <input type="number" id="id" name="id" required>
                <button type="button" onclick="editById('cidade')">Editar</button>
            </div>
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>
            </div>
            <div class="form-group">
                <label for="estado">Estado:</label>
                <input type="text" id="estado" name="estado" required>
            </div>
            <div class="form-group">
                <label for="pais">País:</label>
                <input type="text" id="pais" name="pais" required>
            </div>
            <div class="form-group">
                <label for="populacao">População:</label>
                <input type="number" id="populacao" name="populacao" required>
            </div>
            <button type="submit">Adicionar Cidade</button>
        </form>
    `;
}

function getPaisForm() {
    return `
        <form onsubmit="submitForm(event, 'pais')">
            <div class="form-group">
                <label for="id">ID:</label>
                <input type="number" id="id" name="id" required>
                <button type="button" onclick="editById('pais')">Editar</button>
            </div>
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>
            </div>
            <div class="form-group">
                <label for="continente">Continente:</label>
                <input type="text" id="continente" name="continente" required>
            </div>
            <div class="form-group">
                <label for="capital">Capital:</label>
                <input type="text" id="capital" name="capital" required>
            </div>
            <div class="form-group">
                <label for="populacao">População:</label>
                <input type="number" id="populacao" name="populacao" required>
            </div>
            <button type="submit">Adicionar País</button>
        </form>
    `;
}

function getCarroForm() {
    return `
        <form onsubmit="submitForm(event, 'carro')">
            <div class="form-group">
                <label for="id">ID:</label>
                <input type="number" id="id" name="id" required>
                <button type="button" onclick="editById('carro')">Editar</button>
            </div>
            <div class="form-group">
                <label for="modelo">Modelo:</label>
                <input type="text" id="modelo" name="modelo" required>
            </div>
            <div class="form-group">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" name="marca" required>
            </div>
            <div class="form-group">
                <label for="ano">Ano:</label>
                <input type="number" id="ano" name="ano" required>
            </div>
            <div class="form-group">
                <label for="categoria">Categoria:</label>
                <input type="text" id="categoria" name="categoria" required>
            </div>
            <div class="form-group">
                <label for="pais">País:</label>
                <input type="text" id="pais" name="pais" required>
            </div>
            <button type="submit">Adicionar Carro</button>
        </form>
    `;
}

function editById(entity) {
    const id = document.getElementById('id').value;
    showEditForm(entity, id);
}
