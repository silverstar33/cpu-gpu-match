document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => populateCPUSelect(data.CPUs));
});

function populateCPUSelect(cpus) {
    const cpuSelect = document.getElementById('cpu-select');
    cpus.forEach(cpu => {
        const option = document.createElement('option');
        option.value = cpu;
        option.textContent = cpu;
        cpuSelect.appendChild(option);
    });
}

function fetchCompatibleGPUs() {
    const cpuSelect = document.getElementById('cpu-select');
    const selectedCPU = cpuSelect.value;

    if (!selectedCPU) {
        document.getElementById('gpu-list').innerHTML = '';
        return;
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const compatibleGPUs = data.Compatibility[selectedCPU];
            displayGPUs(compatibleGPUs);
        });
}

function displayGPUs(gpus) {
    const gpuList = document.getElementById('gpu-list');
    gpuList.innerHTML = '';
    gpus.forEach((gpu, index) => {
        const gpuItem = document.createElement('div');
        gpuItem.className = 'gpu-item';
        gpuItem.style.animationDelay = `${index * 0.1}s`;
        gpuItem.textContent = gpu;
        gpuList.appendChild(gpuItem);
    });
}
