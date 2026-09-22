const modalitySelect = document.getElementById('event_modality');
const locationGroup = document.getElementById('location_group');
const locationInput = document.getElementById('event_location');
const remoteUrlGroup = document.getElementById('remote_url_group');
const remoteUrlInput = document.getElementById('event_remote_url');
const events =[];
let eventBeingEdited = null;

document.getElementById('create_event_button').addEventListener('click', () => {
    eventBeingEdited = null;
    document.getElementById('event_form').reset();
    updateLocationOptions();
    document.getElementById('event_modal_label').textContent = 'Create Event';
    document.getElementById('save_event_button').textContent = 'Save Event';
});

modalitySelect.addEventListener('change', () => {
	const isRemote = modalitySelect.value === 'remote';
	locationGroup.classList.toggle('d-none', isRemote);
	locationInput.disabled = isRemote;
	locationInput.required = !isRemote;
	remoteUrlGroup.classList.toggle('d-none', !isRemote);
	remoteUrlInput.disabled = !isRemote;
	remoteUrlInput.required = isRemote;
});

function saveEvent(submitEvent) {
    submitEvent.preventDefault();
    const form = document.getElementById('event_form');
    if(!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const modality = document.getElementById('event_modality').value;
    const eventDetails = {
        name: document.getElementById('event_name').value,
        weekday: document.getElementById('event_weekday').value,
        time: document.getElementById('event_time').value,
        modality: modality,
        location: modality === 'in-person' ? document.getElementById('event_location').value : null,
        remote_Url: modality === 'remote' ? document.getElementById('event_remote_url').value : null,
        attendees: document.getElementById('event_attendees').value, 
        category: document.getElementById('event_category').value
    };

    if (eventBeingEdited) {
        Object.assign(eventBeingEdited, eventDetails);
        updateEventCard(eventBeingEdited);
    } else {
        events.push(eventDetails);
        addEventToCalendarUI(eventDetails);
    }

    console.log(events);
    eventBeingEdited = null;
    form.reset();
    updateLocationOptions();
    document.getElementById('event_modal_label').textContent = 'Create Event';
    document.getElementById('save_event_button').textContent = 'Save Event';
    const modalElement = document.getElementById('event_modal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();
}

function updateLocationOptions() {
   let modality = document.getElementById('event_modality').value;
   let locationGroup = document.getElementById('location_group'); 
   let remoteGroup = document.getElementById('remote_url_group');
   let locationInput = document.getElementById('event_location');
   let remoteInput = document.getElementById('event_remote_url');

   if(modality === 'in-person') {
        locationGroup.classList.remove('d-none');
        remoteGroup.classList.add('d-none');
        locationInput.required = true;
        remoteInput.required = false;
        locationInput.disabled = false;
        remoteInput.disabled = true;
   }
   else if(modality === 'remote') {
        locationGroup.classList.add('d-none');
        remoteGroup.classList.remove('d-none');
        locationInput.required = false;
        remoteInput.required = true;
        locationInput.disabled = true;
        remoteInput.disabled = false;
   }
}

function createEventCard(eventDetails) {
    const eventElement = document.createElement('div');
    eventElement.className = 'event row border rounded m-1 py-1';
    eventElement.addEventListener('click', () => openEditModal(eventDetails));
    eventDetails.element = eventElement;
    renderEventCard(eventElement, eventDetails);
    return eventElement;
}

function renderEventCard(eventElement, eventDetails) {
    updateColor(eventElement, eventDetails);
    const eventContent = document.createElement('div');
    eventContent.innerHTML = `
        <strong>${eventDetails.name}</strong><br>
        ${eventDetails.time}<br>
        ${eventDetails.modality === 'in-person' ? eventDetails.location : eventDetails.remote_Url}<br>
        Attendees: ${eventDetails.attendees}<br>
        Category: ${eventDetails.category}
        `;
    eventElement.replaceChildren(eventContent);
}

function updateEventCard(eventDetails) {
    renderEventCard(eventDetails.element, eventDetails);
    const weekdayColumn = document.getElementById(eventDetails.weekday.toLowerCase());
    if (eventDetails.element.parentElement !== weekdayColumn) {
        weekdayColumn.appendChild(eventDetails.element);
    }
}

function openEditModal(eventDetails) {
    eventBeingEdited = eventDetails;
    document.getElementById('event_name').value = eventDetails.name;
    document.getElementById('event_weekday').value = eventDetails.weekday;
    document.getElementById('event_time').value = eventDetails.time;
    document.getElementById('event_modality').value = eventDetails.modality;
    document.getElementById('event_location').value = eventDetails.location || '';
    document.getElementById('event_remote_url').value = eventDetails.remote_Url || '';
    document.getElementById('event_attendees').value = eventDetails.attendees;
    document.getElementById('event_category').value = eventDetails.category;
    updateLocationOptions();
    document.getElementById('event_modal_label').textContent = 'Update Event';
    document.getElementById('save_event_button').textContent = 'Update Event';

    const modalElement = document.getElementById('event_modal');
    bootstrap.Modal.getOrCreateInstance(modalElement).show();
}

function addEventToCalendarUI(eventInfo) {
    const eventCard = createEventCard(eventInfo);
    const weekday = eventInfo.weekday.toLowerCase();
    const weekdayCol = document.getElementById(weekday);
    weekdayCol.appendChild(eventCard);
}

function updateColor(eventElement, eventInfo){
    const colors = {
        Work: '#dbeafe',
        Personal: '#9de0b5',
        Academic: '#fcd5ce',
        Social: '#fef9c3',
    }
    eventElement.style.backgroundColor = colors[eventInfo.category] || '#ffffff';
}
