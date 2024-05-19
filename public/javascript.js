document.addEventListener('DOMContentLoaded', () => {
    const date1 = new Date('2024-04-22');
    const date2 = new Date('2024-05-22');
    const selectElement = document.getElementById('date-select');
    const submitButton = document.getElementById('submit-btn');
    const selectedDateElement = document.getElementById('selected-date');

    // Generate date options for the select dropdown
    let nowDate = date1;
    while (nowDate <= date2) {
        const option = document.createElement('option');
        const formattedDate = nowDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
        option.value = formattedDate;
        option.textContent = formattedDate;
        selectElement.appendChild(option);
        nowDate.setDate(nowDate.getDate() + 1);
    }

    // Pad single digit numbers with leading zero
    function padZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    // Handle submit button click
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const selectedDate = selectElement.value;
        if (selectedDate) {
            const date = new Date(selectedDate);
            const formattedDate = `${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}`;
            //selectedDateElement.textContent = `選擇的日期: ${formattedDate}`;
            const response = await fetch("/api/soy",{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ date: formattedDate })
            })
            if (response.ok) {
                const data = await response.json();
                // 假設回傳的數據是數組並且只包含一個對象
                if (data.length > 0) {
                    const cost = data[0].cost; // 提取 cost 值
                    document.getElementById('price_area').innerText = "豆粉價格: "+ cost;
                } else {
                    document.getElementById('price_area').innerText = "查無資料";
                }
            } else {
                const error = await response.text();
                document.getElementById('price_area').innerText = error;
            }

        }
    });
});