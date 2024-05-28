function handleWorkoutChange() {
	const workoutValue = document.getElementById('workout').value
	const exercises = document.getElementById('exercises')
	const exerciseList = document.getElementById('exerciseList')

	exerciseList.innerHTML = '' // Clear previous exercises

	if (workoutValue) {
		exercises.classList.remove('hidden')
		for (let i = 1; i <= 5; i++) {
			const exerciseItem = document.createElement('div')
			exerciseItem.className = 'mb-4 p-4 border rounded-lg'
			exerciseItem.innerHTML = `
              <h4 class="text-lg mb-2">Exercise ${i}</h4>
              <label class="block text-gray-700">Name:</label>
              <input type="text" class="mt-1 block w-full mb-2 p-2 border rounded">
              <label class="block text-gray-700">Series:</label>
              <input type="text" class="mt-1 block w-full mb-2 p-2 border rounded">
              <label class="block text-gray-700">Repetitions:</label>
              <input type="text" class="mt-1 block w-full mb-2 p-2 border rounded">
              <label class="block text-gray-700">Load (kg):</label>
              <input type="text" class="mt-1 block w-full mb-2 p-2 border rounded">
              <label class="block text-gray-700">Rest (min):</label>
              <input type="text" class="mt-1 block w-full mb-2 p-2 border rounded">
              <label class="block text-gray-700">Photo:</label>
              <input type="file" class="mt-1 block w-full mb-2 p-2 border rounded">
          `
			exerciseList.appendChild(exerciseItem)
		}
	} else {
		exercises.classList.add('hidden')
	}
}

function resetForm() {
	document.getElementById('form').reset()
	document.getElementById('exercises').classList.add('hidden')
	document.getElementById('exerciseList').innerHTML = ''
}
