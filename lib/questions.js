/**
 * 문제 은행 — 7단계 난이도, 총 119문제
 * Level 1: 그림 보고 단어 맞추기, 첫 글자 맞추기
 * Level 2: 파닉스, 스펠링 끼워넣기, 기초 단어
 * Level 3: a/an, 빈칸 채우기, 반대말
 * Level 4: 복수형, 빈칸 채우기
 * Level 5: 해석, 어순, 독해
 * Level 6: 해석, 빈칸 채우기, 독해
 * Level 7: 해석, 빈칸 채우기, 고급 독해
 */

export const questions = [
  // ── LEVEL 1: 그림 보고 단어 맞추기, 첫 글자 ──
  { id: "L1-01", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🐶", options: ["cat", "dog", "bird", "fish"], answer: 1 },
  { id: "L1-02", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🍎", options: ["grape", "banana", "apple", "orange"], answer: 2 },
  { id: "L1-03", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "📖", options: ["pen", "bag", "book", "desk"], answer: 2 },
  { id: "L1-04", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🐱", options: ["rabbit", "cat", "mouse", "dog"], answer: 1 },
  { id: "L1-05", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🌳", options: ["flower", "grass", "tree", "leaf"], answer: 2 },
  { id: "L1-06", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "☀️", options: ["moon", "star", "cloud", "sun"], answer: 3 },
  { id: "L1-07", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🌈", options: ["rain", "rainbow", "cloud", "wind"], answer: 1 },
  { id: "L1-08", level: 1, category: "phonics", question: "이 그림의 영어 이름은 어떤 글자로 시작할까요?", picture: "🍌", sub: "(바나나)", options: ["D", "A", "B", "C"], answer: 2 },
  { id: "L1-09", level: 1, category: "phonics", question: "이 그림의 영어 이름은 어떤 글자로 시작할까요?", picture: "🐶", sub: "(강아지)", options: ["B", "C", "D", "A"], answer: 2 },
  { id: "L1-10", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "✏️", options: ["eraser", "pencil", "ruler", "crayon"], answer: 1 },
  { id: "L1-11", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🐟", options: ["bird", "frog", "fish", "duck"], answer: 2 },
  { id: "L1-12", level: 1, category: "phonics", question: "이 그림의 영어 이름은 어떤 글자로 시작할까요?", picture: "🍎", sub: "(사과)", options: ["B", "E", "A", "C"], answer: 2 },
  { id: "L1-13", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🏠", options: ["school", "park", "house", "store"], answer: 2 },
  { id: "L1-14", level: 1, category: "phonics", question: "이 그림의 영어 이름은 어떤 글자로 시작할까요?", picture: "🐱", sub: "(고양이)", options: ["D", "B", "A", "C"], answer: 3 },
  { id: "L1-15", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "⭐", options: ["sun", "moon", "star", "cloud"], answer: 2 },
  { id: "L1-16", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🚗", options: ["bus", "bike", "car", "train"], answer: 2 },
  { id: "L1-17", level: 1, category: "vocabulary", question: "이 그림은 영어로 무엇일까요?", picture: "🎒", options: ["hat", "bag", "box", "cup"], answer: 1 },

  // ── LEVEL 2: 파닉스, 스펠링 끼워넣기 ──
  { id: "L2-01", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: c _ t", picture: "🐱", sub: "(힌트: 고양이)", options: ["o", "a", "u", "e"], answer: 1 },
  { id: "L2-02", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: d _ g", picture: "🐶", sub: "(힌트: 강아지)", options: ["i", "a", "o", "u"], answer: 2 },
  { id: "L2-03", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: f _ x", picture: "🦊", sub: "(힌트: 여우)", options: ["a", "i", "o", "u"], answer: 2 },
  { id: "L2-04", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: h _ n", picture: "🐔", sub: "(힌트: 암탉)", options: ["a", "i", "e", "u"], answer: 2 },
  { id: "L2-05", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: s _ n", picture: "☀️", sub: "(힌트: 태양)", options: ["a", "i", "o", "u"], answer: 3 },
  { id: "L2-06", level: 2, category: "vocabulary", question: "'아빠'를 영어로 하면?", options: ["mother", "brother", "father", "uncle"], answer: 2 },
  { id: "L2-07", level: 2, category: "vocabulary", question: "'물'을 영어로 하면?", options: ["milk", "juice", "water", "tea"], answer: 2 },
  { id: "L2-08", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: b _ d", picture: "🛏️", sub: "(힌트: 침대)", options: ["a", "e", "i", "u"], answer: 1 },
  { id: "L2-09", level: 2, category: "vocabulary", question: "'빨간색'을 영어로 하면?", options: ["blue", "green", "yellow", "red"], answer: 3 },
  { id: "L2-10", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: c _ p", picture: "☕", sub: "(힌트: 컵)", options: ["a", "o", "u", "i"], answer: 2 },
  { id: "L2-11", level: 2, category: "vocabulary", question: "'우유'를 영어로 하면?", options: ["water", "milk", "juice", "soda"], answer: 1 },
  { id: "L2-12", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: m _ p", picture: "🗺️", sub: "(힌트: 지도)", options: ["o", "i", "a", "u"], answer: 2 },
  { id: "L2-13", level: 2, category: "vocabulary", question: "'하나'를 영어로 하면?", options: ["two", "three", "one", "four"], answer: 2 },
  { id: "L2-14", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: b _ s", picture: "🚌", sub: "(힌트: 버스)", options: ["a", "o", "u", "i"], answer: 2 },
  { id: "L2-15", level: 2, category: "vocabulary", question: "'눈'(body)을 영어로 하면?", options: ["ear", "nose", "eye", "mouth"], answer: 2 },
  { id: "L2-16", level: 2, category: "phonics", question: "빈칸을 채워 단어를 완성하세요: p _ n", picture: "🖊️", sub: "(힌트: 펜)", options: ["a", "i", "e", "u"], answer: 2 },
  { id: "L2-17", level: 2, category: "vocabulary", question: "'손'을 영어로 하면?", options: ["foot", "hand", "arm", "leg"], answer: 1 },

  // ── LEVEL 3: a/an, 빈칸 채우기, 반대말 ──
  { id: "L3-01", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? ___ orange", options: ["a", "an"], answer: 1 },
  { id: "L3-02", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? ___ cat", options: ["a", "an"], answer: 0 },
  { id: "L3-03", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? ___ elephant", options: ["a", "an"], answer: 1 },
  { id: "L3-04", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? ___ university", sub: "(주의: 발음이 [ju]로 시작!)", options: ["a", "an"], answer: 0 },
  { id: "L3-05", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? He ___ my teacher.", options: ["am", "is", "are", "be"], answer: 1 },
  { id: "L3-06", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? We ___ happy.", options: ["am", "is", "are", "be"], answer: 2 },
  { id: "L3-07", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? I ___ ten years old.", options: ["am", "is", "are", "be"], answer: 0 },
  { id: "L3-08", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? The cats ___ on the sofa.", options: ["am", "is", "are", "be"], answer: 2 },
  { id: "L3-09", level: 3, category: "vocabulary", question: "'tall'의 반대말은?", options: ["big", "short", "long", "small"], answer: 1 },
  { id: "L3-10", level: 3, category: "vocabulary", question: "'hot'의 반대말은?", options: ["warm", "cool", "cold", "ice"], answer: 2 },
  { id: "L3-11", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? ___ honest man", sub: "(주의: h가 묵음!)", options: ["a", "an"], answer: 1 },
  { id: "L3-12", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? My sister ___ a nurse.", options: ["am", "is", "are", "be"], answer: 1 },
  { id: "L3-13", level: 3, category: "vocabulary", question: "'happy'의 반대말은?", options: ["angry", "sad", "tired", "sick"], answer: 1 },
  { id: "L3-14", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? It ___ rainy today.", options: ["am", "is", "are", "be"], answer: 1 },
  { id: "L3-15", level: 3, category: "vocabulary", question: "'fast'의 반대말은?", options: ["quick", "heavy", "slow", "light"], answer: 2 },
  { id: "L3-16", level: 3, category: "grammar", question: "빈칸에 알맞은 것은? ___ apple a day keeps the doctor away.", options: ["A", "An"], answer: 1 },
  { id: "L3-17", level: 3, category: "vocabulary", question: "요일 중 월요일을 영어로 하면?", options: ["Tuesday", "Sunday", "Monday", "Friday"], answer: 2 },

  // ── LEVEL 4: 복수형, 빈칸 채우기 ──
  { id: "L4-01", level: 4, category: "grammar", question: "'child'의 복수형은?", options: ["childs", "childes", "children", "childies"], answer: 2 },
  { id: "L4-02", level: 4, category: "grammar", question: "'tooth'의 복수형은?", options: ["tooths", "toothes", "teethes", "teeth"], answer: 3 },
  { id: "L4-03", level: 4, category: "grammar", question: "'leaf'의 복수형은?", options: ["leafs", "leaves", "leafes", "leafies"], answer: 1 },
  { id: "L4-04", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? She ___ breakfast every morning.", options: ["eat", "eats", "eating", "eated"], answer: 1 },
  { id: "L4-05", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? My brother ___ soccer after school.", options: ["play", "plays", "playing", "playes"], answer: 1 },
  { id: "L4-06", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? The bird ___ in the sky.", options: ["fly", "flys", "flies", "flying"], answer: 2 },
  { id: "L4-07", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? ___ is my best friend. (여자)", options: ["He", "She", "It", "They"], answer: 1 },
  { id: "L4-08", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? This pencil is ___.", sub: "(나의 것)", options: ["my", "me", "mine", "I"], answer: 2 },
  { id: "L4-09", level: 4, category: "grammar", question: "'city'의 복수형은?", options: ["citys", "cityes", "cities", "cityies"], answer: 2 },
  { id: "L4-10", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? Tom ___ his homework every evening.", options: ["do", "does", "doing", "doed"], answer: 1 },
  { id: "L4-11", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? ___ like ice cream.", sub: "(우리는)", options: ["Us", "Our", "We", "Ours"], answer: 2 },
  { id: "L4-12", level: 4, category: "grammar", question: "'box'의 복수형은?", options: ["boxs", "boxes", "boxies", "boxen"], answer: 1 },
  { id: "L4-13", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? My mom ___ dinner for us.", options: ["cook", "cooks", "cooking", "cookes"], answer: 1 },
  { id: "L4-14", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? Give it to ___.", sub: "(그에게)", options: ["he", "his", "him", "her"], answer: 2 },
  { id: "L4-15", level: 4, category: "grammar", question: "'mouse'의 복수형은?", options: ["mouses", "mousies", "mice", "mices"], answer: 2 },
  { id: "L4-16", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? The baby ___ every night.", options: ["cry", "crys", "cries", "cryes"], answer: 2 },
  { id: "L4-17", level: 4, category: "grammar", question: "빈칸에 알맞은 것은? That bag is ___.", sub: "(그녀의 것)", options: ["she", "her", "hers", "herself"], answer: 2 },

  // ── LEVEL 5: 해석, 어순, 독해 ──
  { id: "L5-01", level: 5, category: "grammar", question: "'그녀는 피아노를 치지 않는다.'를 영어로 하면?", options: ["She don't play the piano.", "She doesn't play the piano.", "She not plays the piano.", "She doesn't plays the piano."], answer: 1 },
  { id: "L5-02", level: 5, category: "grammar", question: "'그들은 서울에 살고 있나요?'를 영어로 하면?", options: ["Are they live in Seoul?", "Does they live in Seoul?", "Do they live in Seoul?", "They do live in Seoul?"], answer: 2 },
  { id: "L5-03", level: 5, category: "grammar", question: "'그는 의사가 아니다.'를 영어로 하면?", options: ["He doesn't a doctor.", "He not is a doctor.", "He isn't a doctor.", "He don't is a doctor."], answer: 2 },
  { id: "L5-04", level: 5, category: "grammar", question: "올바른 어순을 고르세요: usually / she / gets up / early", options: ["Usually she gets up early.", "She usually gets up early.", "She gets up usually early.", "She gets usually up early."], answer: 1 },
  { id: "L5-05", level: 5, category: "grammar", question: "올바른 어순을 고르세요: do / where / live / you", options: ["Where you do live?", "Do where you live?", "Where do you live?", "You do live where?"], answer: 2 },
  { id: "L5-06", level: 5, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Tom wakes up at 7 o'clock.\nHe eats cereal for breakfast.\nThen he walks to school with his friend Jake.", sub: "Tom은 아침에 무엇을 먹나요?", options: ["Toast", "Rice", "Cereal", "Pancakes"], answer: 2 },
  { id: "L5-07", level: 5, category: "reading", question: "다음 글을 읽고 답하세요.", context: "My name is Mina. I have a pet rabbit.\nHis name is Snowball because he is all white.\nHe likes to eat carrots and lettuce.", sub: "Snowball은 어떤 동물인가요?", options: ["A cat", "A dog", "A hamster", "A rabbit"], answer: 3 },
  { id: "L5-08", level: 5, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Emily goes to the library every Saturday.\nShe borrows two books each time.\nShe likes stories about animals the most.", sub: "Emily가 가장 좋아하는 이야기 종류는?", options: ["Adventure stories", "Animal stories", "Fairy tales", "Science fiction"], answer: 1 },
  { id: "L5-09", level: 5, category: "grammar", question: "'Mike는 매일 밤 TV를 보나요?'를 영어로 하면?", options: ["Does Mike watches TV every night?", "Do Mike watch TV every night?", "Does Mike watch TV every night?", "Is Mike watch TV every night?"], answer: 2 },
  { id: "L5-10", level: 5, category: "translation", question: "'How old are you?'를 해석하면?", options: ["너는 어디에 사니?", "너는 몇 살이니?", "너는 누구니?", "너는 무엇을 좋아하니?"], answer: 1 },
  { id: "L5-11", level: 5, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Today is Jane's birthday. She is 11 years old.\nHer friends came to her house.\nThey ate cake and played games together.", sub: "Jane의 집에 누가 왔나요?", options: ["Her teachers", "Her cousins", "Her friends", "Her parents"], answer: 2 },
  { id: "L5-12", level: 5, category: "grammar", question: "올바른 어순을 고르세요: can / how many / you / languages / speak", options: ["How many languages can you speak?", "How many can you speak languages?", "Can you how many languages speak?", "You can speak how many languages?"], answer: 0 },
  { id: "L5-13", level: 5, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Sam and his dad went fishing last Sunday.\nThey caught three fish at the lake.\nSam was very excited and wanted to go again.", sub: "Sam과 아빠는 어디에 갔나요?", options: ["To the river", "To the sea", "To the lake", "To the pool"], answer: 2 },
  { id: "L5-14", level: 5, category: "grammar", question: "'우리는 학생이 아니다.'를 영어로 하면?", options: ["We don't students.", "We aren't students.", "We isn't students.", "We not are students."], answer: 1 },
  { id: "L5-15", level: 5, category: "translation", question: "'What time is it now?'를 해석하면?", options: ["지금 몇 시니?", "지금 무엇을 하고 있니?", "지금 어디에 있니?", "지금 누구랑 있니?"], answer: 0 },
  { id: "L5-16", level: 5, category: "reading", question: "다음 글을 읽고 답하세요.", context: "The weather is very cold today.\nAnna wears a warm coat and a scarf.\nShe also puts on her boots before going outside.", sub: "Anna가 신은 것은?", options: ["Sandals", "Sneakers", "Boots", "Slippers"], answer: 2 },
  { id: "L5-17", level: 5, category: "grammar", question: "빈칸에 알맞은 것은? There ___ many apples on the table.", options: ["is", "am", "are", "be"], answer: 2 },

  // ── LEVEL 6: 해석, 빈칸 채우기, 독해 ──
  { id: "L6-01", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? I want ___ a scientist in the future.", options: ["become", "becoming", "to become", "became"], answer: 2 },
  { id: "L6-02", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? She has a lot of homework ___.", options: ["finish", "to finish", "finishing", "finished"], answer: 1 },
  { id: "L6-03", level: 6, category: "grammar", question: "'이 다리는 작년에 지어졌다.'를 영어로 하면?", options: ["This bridge built last year.", "This bridge was built last year.", "This bridge is built last year.", "This bridge were built last year."], answer: 1 },
  { id: "L6-04", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? She studied hard ___ pass the exam.", options: ["for", "to", "of", "at"], answer: 1 },
  { id: "L6-05", level: 6, category: "grammar", question: "'그 답은 모두에게 알려져 있다.'를 영어로 하면?", options: ["The answer is known by everyone.", "The answer known by everyone.", "The answer are known by everyone.", "The answer was known by everyone."], answer: 0 },
  { id: "L6-06", level: 6, category: "translation", question: "'그는 일찍 일어나기 위해 알람을 맞추었다.'를 영어로 하면?", options: ["He set an alarm to wake up early.", "He set an alarm for waking up early.", "He sets an alarm to wake up early.", "He setting an alarm to wake up early."], answer: 0 },
  { id: "L6-07", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? I went to the store ___ it was raining.", options: ["because", "although", "so", "but"], answer: 1 },
  { id: "L6-08", level: 6, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Recycling is important for our planet.\nWhen we recycle paper, we save trees.\nWhen we recycle plastic, we reduce pollution.\nEveryone can help by sorting their trash.", sub: "이 글의 주제는?", options: ["요리법", "재활용의 중요성", "여행 안내", "동물 보호"], answer: 1 },
  { id: "L6-09", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? The letter ___ by my grandmother.", sub: "(그 편지는 할머니가 쓰셨다)", options: ["writes", "wrote", "was written", "is written"], answer: 2 },
  { id: "L6-10", level: 6, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Benjamin Franklin was an American inventor.\nHe invented many useful things, including bifocal glasses.\nHe also proved that lightning is electricity\nby flying a kite during a thunderstorm.", sub: "Benjamin Franklin이 발명한 것은?", options: ["The telephone", "Bifocal glasses", "The light bulb", "The airplane"], answer: 1 },
  { id: "L6-11", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? ___ I was young, I lived in Busan.", options: ["While", "When", "During", "For"], answer: 1 },
  { id: "L6-12", level: 6, category: "translation", question: "'이 노래는 많은 사람들에 의해 사랑받는다.'를 영어로 하면?", options: ["Many people love this song.", "This song loved by many people.", "This song is loved by many people.", "This song was loving by many people."], answer: 2 },
  { id: "L6-13", level: 6, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Dolphins are very smart animals.\nThey live in groups called pods.\nDolphins communicate with each other\nusing clicks and whistles.", sub: "돌고래 무리를 무엇이라고 부르나요?", options: ["Packs", "Herds", "Pods", "Flocks"], answer: 2 },
  { id: "L6-14", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? He decided ___ abroad next year.", options: ["study", "studying", "to study", "studied"], answer: 2 },
  { id: "L6-15", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? She was tired, ___ she kept working.", options: ["so", "because", "but", "and"], answer: 2 },
  { id: "L6-16", level: 6, category: "reading", question: "다음 글을 읽고 답하세요.", context: "The Amazon rainforest produces about 20% of\nthe world's oxygen. It is home to millions of\nspecies of plants and animals. Scientists call it\n'the lungs of the Earth.'", sub: "아마존 열대우림의 별명은?", options: ["The heart of the Earth", "The lungs of the Earth", "The eyes of the Earth", "The brain of the Earth"], answer: 1 },
  { id: "L6-17", level: 6, category: "grammar", question: "빈칸에 알맞은 것은? It is important ___ exercise every day.", options: ["for", "at", "to", "of"], answer: 2 },

  // ── LEVEL 7: 해석, 빈칸 채우기, 고급 독해 ──
  { id: "L7-01", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? She ___ in Paris since 2020.", options: ["lives", "lived", "has lived", "is living"], answer: 2 },
  { id: "L7-02", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? If it ___ sunny tomorrow, we will have a picnic.", options: ["is", "will be", "was", "would be"], answer: 0 },
  { id: "L7-03", level: 7, category: "grammar", question: "'그 수업은 선생님에 의해 우리에게 설명되었다.'를 영어로 하면?", options: ["The lesson was explained to us by the teacher.", "The lesson explained by the teacher to us.", "We were explained the lesson by the teacher.", "The lesson is explained to us by the teacher."], answer: 0 },
  { id: "L7-04", level: 7, category: "translation", question: "'그녀는 너무 바빠서 점심을 먹지 못했다.'를 영어로 하면?", options: ["She was so busy that she couldn't eat lunch.", "She was busy so she not eat lunch.", "She so busy that couldn't eat lunch.", "She is too busy to eating lunch."], answer: 0 },
  { id: "L7-05", level: 7, category: "translation", question: "'I have never been to Europe.'를 해석하면?", options: ["나는 유럽에 한 번 갔었다.", "나는 유럽에 가본 적이 없다.", "나는 유럽에 갈 것이다.", "나는 유럽에 가고 싶다."], answer: 1 },
  { id: "L7-06", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? She asked me ___ the door.", options: ["open", "opening", "to open", "opened"], answer: 2 },
  { id: "L7-07", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? I heard somebody ___ in the room.", options: ["sings", "to sing", "singing", "sung"], answer: 2 },
  { id: "L7-08", level: 7, category: "reading", question: "다음 글을 읽고 답하세요.", context: "The Great Wall of China was built over many centuries\nto protect China from invasions. It stretches over\n13,000 miles and is one of the most famous\nlandmarks in the world. Millions of tourists visit it\nevery year.", sub: "만리장성이 지어진 목적은?", options: ["관광을 위해", "침략으로부터 보호하기 위해", "무역 통로로 사용하기 위해", "도시를 나누기 위해"], answer: 1 },
  { id: "L7-09", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? If I ___ you, I would apologize.", options: ["am", "was", "were", "be"], answer: 2 },
  { id: "L7-10", level: 7, category: "translation", question: "'그는 3년 동안 영어를 공부해 왔다.'를 영어로 하면?", options: ["He studied English for three years.", "He has studied English for three years.", "He studies English for three years.", "He will study English for three years."], answer: 1 },
  { id: "L7-11", level: 7, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Marie Curie was a Polish-born scientist who\nmoved to France to study. She discovered two new\nelements: polonium and radium. She was the first\nwoman to win a Nobel Prize, and the only person\nto win Nobel Prizes in two different sciences.", sub: "Marie Curie가 발견한 것은?", options: ["Gravity and motion", "Polonium and radium", "Penicillin and vaccines", "DNA and genes"], answer: 1 },
  { id: "L7-12", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? ___ you ever tried Korean food?", options: ["Do", "Did", "Have", "Are"], answer: 2 },
  { id: "L7-13", level: 7, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Plastic pollution is a growing problem in our oceans.\nSea animals often mistake plastic bags for food.\nScientists estimate that by 2050, there could be\nmore plastic than fish in the ocean by weight.", sub: "2050년까지 예상되는 것은?", options: ["바다 물고기가 두 배로 늘어남", "플라스틱이 물고기보다 무게가 더 많아짐", "모든 플라스틱이 재활용됨", "바다가 깨끗해짐"], answer: 1 },
  { id: "L7-14", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? The book ___ by millions of readers worldwide.", sub: "(그 책은 전 세계 수백만 독자에게 읽혀왔다)", options: ["has read", "has been read", "have been read", "was reading"], answer: 1 },
  { id: "L7-15", level: 7, category: "translation", question: "'If I had studied harder, I would have passed the exam.'를 해석하면?", options: ["내가 더 열심히 공부한다면, 시험에 합격할 것이다.", "내가 더 열심히 공부했더라면, 시험에 합격했을 텐데.", "내가 열심히 공부해서 시험에 합격했다.", "내가 공부를 하지 않아서 시험에 떨어졌다."], answer: 1 },
  { id: "L7-16", level: 7, category: "reading", question: "다음 글을 읽고 답하세요.", context: "Sleep is essential for brain health.\nDuring sleep, the brain processes memories\nand removes waste products.\nTeenagers need 8-10 hours of sleep per night,\nbut many get less than 7 hours.", sub: "수면 중 뇌가 하는 일이 아닌 것은?", options: ["기억을 처리한다", "노폐물을 제거한다", "새로운 세포를 만든다", "위의 활동 모두 한다"], answer: 2 },
  { id: "L7-17", level: 7, category: "grammar", question: "빈칸에 알맞은 것은? She is the kindest person ___ I have ever met.", options: ["who", "whom", "that", "which"], answer: 2 },
];

export const CATEGORY_LABELS = {
  alphabet: "알파벳",
  vocabulary: "어휘",
  phonics: "파닉스",
  grammar: "문법",
  reading: "독해",
  translation: "해석/작문",
};

/**
 * 배열 셔플 (Fisher-Yates)
 */
export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
