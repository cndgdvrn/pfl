# 📘 PFL (Plans For Life) - Ürün Gereksinim Belgesi

## 1. Proje Genel Bakış

### 1.1 Giriş

**PFL (Plans For Life)**, kullanıcıların günlük yaşamlarının çeşitli yönlerini organize etmelerine ve takip etmelerine yardımcı olmak için tasarlanmış kapsamlı bir yaşam yönetimi web uygulamasıdır. Uygulama, **Next.js** kullanarak akıcı bir kullanıcı deneyimi sunmaya odaklanır ve hem masaüstü hem de mobil cihazlarda çalışan duyarlı bir arayüz sağlar.

### 1.2 Proje Vizyonu

Kullanıcıların günlük aktivitelerini dengelemelerine, sağlıklı alışkanlıklar edinmelerine ve genel üretkenliklerini artırmalarına yardımcı olan sezgisel bir yaşam yönetimi platformu oluşturmak.

### 1.3 Slogan

> **"Look at here!"**

---

## 2. Hedef Kitle

- Daha iyi iş-yaşam dengesi arayan meşgul profesyoneller  
- Sağlık aktivitelerini takip eden sağlık bilincine sahip bireyler  
- Ders programlarını ve kişisel sağlıklarını yöneten öğrenciler  
- Sağlıklı günlük rutinler oluşturmak ve sürdürmek isteyen herkes  

---

## 3. Temel Özellikler

### 3.1 Kullanıcı Paneli

- "PFL" logosunu ve ana kategori seçeneklerini gösteren temiz, minimalist ana ekran  
- Sezgisel simgeler ve metin etiketleriyle gösterilen ana kategoriler  
- Hem masaüstü hem de mobil deneyimler için tasarlanmış navigasyon  

### 3.2 Aktivite Kategorileri

Uygulama beş temel yaşam yönünü takip edecek:

- **Spor**: Egzersiz aktiviteleri, antrenmanlar ve fiziksel hedefler  
- **Yemek**: Beslenme planlaması, öğün programları ve diyet takibi  
- **İş**: Profesyonel görevler, toplantılar ve son teslim tarihleri  
- **Uyku**: Uyku programı takibi ve uyku kalitesi izleme  
- **İlaçlar**: İlaç hatırlatıcıları ve takibi  

### 3.3 Günlük Program Görünümü

- Gün için planlanan tüm aktiviteleri gösteren zaman çizelgesi tabanlı görünüm  
- Her aktivite için net zaman göstergeleri  
- Aktivite türleri için görsel göstergeler (kontrol panelindeki simgelerle aynı)  
- Yeni aktiviteler planlamak için "Hatırlatıcı Ekle" düğmesi  

### 3.4 Aktivite Yönetimi

- Her kategori için aktivite oluşturma, düzenleme ve silme  
- Aktiviteler için zamana dayalı hatırlatıcılar ayarlama  
- Tekrarlanan aktivite seçenekleri (günlük, haftalık, aylık)  
- Her aktivite için notlar bölümü  

---

## 4. Teknik Özellikler

### 4.1 Teknoloji Yığını

- **Frontend**: Next.js, React - Mobile First - Responsive  
- **Stil**: Tailwind CSS veya styled-components  
- **Durum Yönetimi**: React Context API veya Redux  
- **Kimlik Doğrulama**: Basit JSON dosyası ile kullanıcı yönetimi  
- **Veri Saklama**: JSON dosyaları (veritabanı bağlantısı olmadan)  

### 4.2 Duyarlı Tasarım Gereksinimleri

- Çeşitli ekran boyutlarına uyum sağlayan akışkan tasarım  
- Mobil öncelikli yaklaşım  
- Dokunmatik ekran dostu arayüz öğeleri  
- Cihazlar arası tutarlı deneyim  

---

## 5. Kullanıcı Akışları

### 5.1 Kullanıcı Kayıt ve Oryantasyon

1. Kullanıcı açılış sayfasına gelir  
2. Önceden tanımlanmış JSON kullanıcı bilgileriyle oturum açar  
3. Ana kategoriler ve uygulama işlevselliği hakkında kısa bir açıklama görür  
4. Kontrol paneline yönlendirilir  

### 5.2 Yeni Bir Aktivite Ekleme

1. Kullanıcı kontrol panelinden ilgili kategoriyi seçer  
2. "Yeni Ekle" düğmesine dokunur  
3. Aktivite detaylarını girer (ad, zaman, notlar, tekrarlama)  
4. Aktiviteyi kaydeder  
5. Aktivite günlük programda görünür  

### 5.3 Günlük Program Yönetimi

1. Kullanıcı Günlük Program görünümünü açar  
2. Tüm aktiviteleri kronolojik olarak görüntüler  
3. Detayları görüntülemek veya düzenlemek için herhangi bir aktiviteye dokunabilir  
4. Bu görünümden doğrudan yeni hatırlatıcılar ekleyebilir  
5. Farklı günler arasında gezinebilir  

---

## 6. UI/UX Tasarım Özellikleri

### 6.1 Renk Şeması

- **Birincil mavi**: `#3B82F6` (Spor ve Uyku simgeleri için)  
- **Koyu gri**: `#4B5563` (İş simgeleri ve metin için)  
- **Kırmızı**: `#EF4444` (İlaçlar ve belirli UI öğeleri için)  
- **Açık arka planlar**: `#FFFFFF`  
- **Karanlık mod**: Arka plan `#000000`, Logo `#0EA5E9`  

### 6.2 Tipografi

- Temiz, modern sans-serif yazı tipi ailesi  
- Başlıklar ve gövde metni için farklı ağırlıklarla net hiyerarşi  
- Okunabilirlik için yeterli kontrast  

### 6.3 İkonografi

- **Spor**: 🏃‍♂️ (Koşan figür)  
- **Yemek**: 🍴 (Çatal bıçak)  
- **İş**: 💼 (Evrak çantası)  
- **Uyku**: 💤 (Z harfleri)  
- **İlaçlar**: 💊 (Hap/kapsül)  

---

## 7. Geliştirme Aşamaları

### 7.1 Aşama 1: MVP (Jüri Sunumu için)

- Sağlanan mockup'lara uyan işlevsel kullanıcı arayüzü  
- Tüm beş kategoriyi içeren kontrol paneli  
- Örnek aktivitelerle Günlük Program görünümü  
- Hatırlatıcı Ekleme işlevselliği  
- Ekranlar arasında temel navigasyon  

### 7.2 Aşama 2: Temel İşlevsellik

- JSON dosyası ile kullanıcı profili yönetimi  
- Tüm aktivite türleri için tam CRUD işlemleri  
- JSON dosyaları ile veri kalıcılığı  
- Ayarlar ve tercihler  

### 7.3 Aşama 3: Gelişmiş Özellikler

- Alışkanlıklar hakkında analiz ve içgörüler  
- Sosyal paylaşım özellikleri  
- Gelişmiş bildirim sistemi  

---

## 8. Test Stratejisi

### 8.1 Birim Testi

- Tüm React bileşenleri için bileşen düzeyinde testler  
- Durum yönetimi testleri  

### 8.2 Entegrasyon Testi

- Birden fazla bileşen arasında kullanıcı akış testleri  
- JSON veri entegrasyon testleri  

### 8.3 Kullanıcı Testi

- Temsili kullanıcılarla kullanılabilirlik testi  
- Anahtar arayüzlerin A/B testi  

---

## 9. Başarı Metrikleri

- Kullanıcı katılım metrikleri (günlük aktif kullanıcılar, oturum süresi)  
- Görev tamamlama oranı  
- Kullanıcı memnuniyeti (uygulama içi geri bildirim aracılığıyla ölçülür)  
- 1 hafta, 1 ay, 3 ay sonra elde tutma oranları  

---

## 10. Örnek Kullanıcı Verisi (JSON)

```json
{
  "user": {
    "id": "user1",
    "name": "Ali Yılmaz",
    "email": "ali.yilmaz@example.com",
    "preferences": {
      "theme": "light",
      "notificationsEnabled": true,
      "defaultView": "daily"
    }
  },
  "categories": [
    {
      "id": "sports",
      "name": "Spor",
      "icon": "running",
      "color": "#3B82F6"
    },
    {
      "id": "meal",
      "name": "Yemek",
      "icon": "utensils",
      "color": "#EF4444"
    },
    {
      "id": "work",
      "name": "İş",
      "icon": "briefcase",
      "color": "#4B5563"
    },
    {
      "id": "sleep",
      "name": "Uyku",
      "icon": "moon",
      "color": "#3B82F6"
    },
    {
      "id": "pills",
      "name": "İlaçlar",
      "icon": "pill",
      "color": "#EF4444"
    }
  ],
  "activities": [
    {
      "id": "act1",
      "categoryId": "sports",
      "title": "Sabah Koşusu",
      "time": "08:00",
      "duration": 30,
      "recurrence": "daily",
      "notes": "Parkta 5 km koşu",
      "isCompleted": false
    },
    {
      "id": "act2",
      "categoryId": "work",
      "title": "Takım Toplantısı",
      "time": "09:00",
      "duration": 60,
      "recurrence": "weekly",
      "notes": "Sprint planlama toplantısı",
      "isCompleted": false
    },
    {
      "id": "act3",
      "categoryId": "meal",
      "title": "Öğle Yemeği",
      "time": "12:30",
      "duration": 45,
      "recurrence": "daily",
      "notes": "Protein ağırlıklı öğün",
      "isCompleted": false
    },
    {
      "id": "act4",
      "categoryId": "work",
      "title": "Kod İncelemesi",
      "time": "14:00",
      "duration": 90,
      "recurrence": "none",
      "notes": "Yeni özellikler için PR incelemesi",
      "isCompleted": false
    },
    {
      "id": "act5",
      "categoryId": "pills",
      "title": "Vitamin Takviyesi",
      "time": "17:00",
      "duration": 5,
      "recurrence": "daily",
      "notes": "D vitamini ve multi-vitamin",
      "isCompleted": false
    },
    {
      "id": "act6",
      "categoryId": "sports",
      "title": "Akşam Yürüyüşü",
      "time": "18:30",
      "duration": 45,
      "recurrence": "daily",
      "notes": "Sahil boyunca rahat tempo yürüyüş",
      "isCompleted": false
    },
    {
      "id": "act7",
      "categoryId": "sleep",
      "title": "Uyku",
      "time": "23:00",
      "duration": 480,
      "recurrence": "daily",
      "notes": "Uyumadan 30 dk önce ekranları kapatmayı unutma",
      "isCompleted": false
    }
  ]
}
