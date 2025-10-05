// Jawaban yang benar
const correctAnswers = {
    1: "Mekanisme SN2:\n1. –OCH₃ mendekati dari sisi berlawanan Cl pada karbon C-2\n2. Terbentuk keadaan transisi dengan 5 ikatan parsial\n3. Cl⁻ lepas dan terjadi inversi konfigurasi dari R menjadi S\n4. Hasil: (S)-2-metoksibutana\n\n(R)-2-klorobutana → (S)-2-metoksibutana + Cl⁻",
    
    2: "Mekanisme SN1:\nTahap 1 (lambat): (S)-3-kloro-3-metilheksana → 3-metilheksil-3-karbokation + Cl⁻\nTahap 2 (cepat): 3-metilheksil-3-karbokation + CH₃CH₂OH → 3-etoksi-3-metilheksana (rasemat)\n\nKarbokation planar memungkinkan serangan dari kedua sisi, menghasilkan campuran rasemat.",
    
    3: "C",
    
    4: "RO⁻ > HO⁻ > CN⁻ > I⁻",
    
    5: "B"
};

// Fungsi untuk memeriksa jawaban
function checkAnswer(questionNum) {
    const feedback = document.getElementById(`feedback${questionNum}`);
    
    if (questionNum === 1 || questionNum === 2) {
        const answer = document.getElementById(`answer${questionNum}`).value.trim();
        if (answer) {
            feedback.innerHTML = `
                <div class="correct-answer">
                    <strong>Jawaban Anda:</strong>
                    <div style="white-space: pre-wrap; background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">${answer}</div>
                    <strong>Jawaban yang Benar:</strong>
                    <div style="white-space: pre-wrap; background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0;">${correctAnswers[questionNum]}</div>
                </div>
            `;
        } else {
            feedback.innerHTML = '<div class="wrong-answer">Silakan tulis jawaban Anda terlebih dahulu.</div>';
        }
    }
    else if (questionNum === 3 || questionNum === 5) {
        const selected = document.querySelector(`input[name="q${questionNum}"]:checked`);
        if (selected) {
            if (selected.value === correctAnswers[questionNum]) {
                feedback.innerHTML = `<div class="correct-answer">✅ Benar! ${getExplanation(questionNum)}</div>`;
            } else {
                feedback.innerHTML = `<div class="wrong-answer">❌ Salah. Jawaban yang benar adalah ${correctAnswers[questionNum]}. ${getExplanation(questionNum)}</div>`;
            }
        } else {
            feedback.innerHTML = '<div class="wrong-answer">Silakan pilih salah satu jawaban.</div>';
        }
    }
    else if (questionNum === 4) {
        const answer = document.getElementById(`answer4`).value.trim();
        if (answer.toLowerCase() === correctAnswers[4].toLowerCase()) {
            feedback.innerHTML = `<div class="correct-answer">✅ Benar! Urutan nukleofilisitas dalam pelarut protic: ${correctAnswers[4]}</div>`;
        } else {
            feedback.innerHTML = `<div class="wrong-answer">❌ Salah. Urutan yang benar adalah: ${correctAnswers[4]}</div>`;
        }
    }
}

// Fungsi untuk memberikan penjelasan
function getExplanation(questionNum) {
    const explanations = {
        3: "SN2 mengikuti kinetika orde 2, melalui mekanisme satu tahap dengan serangan belakang, menghasilkan inversi konfigurasi, dan optimal untuk alkil halida primer.",
        5: "Pada mekanisme SN2, terjadi inversi konfigurasi sempurna dimana konfigurasi R berubah menjadi S."
    };
    return explanations[questionNum] || "";
}

// Fungsi reset
function resetAll() {
    // Reset text areas
    document.getElementById('answer1').value = '';
    document.getElementById('answer2').value = '';
    document.getElementById('answer4').value = '';
    
    // Reset radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Reset feedback
    document.querySelectorAll('.feedback').forEach(feedback => {
        feedback.innerHTML = '';
    });
    
    alert('Semua jawaban telah direset!');
}