import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Heart, Briefcase, DollarSign, Users, Calendar, Star } from 'lucide-react';

const zodiacData: Record<string, {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  quality: string;
  rulingPlanet: string;
  color: string;
  strengths: string[];
  weaknesses: string[];
  personality: string;
  love: string;
  career: string;
  money: string;
  compatibility: string[];
  famousPeople: string[];
}> = {
  aries: {
    name: 'Aries',
    symbol: '♈',
    dates: 'March 21 - April 19',
    element: 'Fire',
    quality: 'Cardinal',
    rulingPlanet: 'Mars',
    color: 'Red',
    strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate'],
    weaknesses: ['Impatient', 'Moody', 'Short-tempered', 'Impulsive', 'Aggressive'],
    personality: 'Aries is the first sign of the zodiac and represents new beginnings. As a fire sign ruled by Mars, Aries individuals are known for their bold, passionate, and competitive nature. They are natural-born leaders who aren\'t afraid to take risks and dive headfirst into new challenges. Aries people are incredibly energetic and enthusiastic about life. They approach everything with confidence and determination, always ready to blaze new trails. Their pioneering spirit makes them excellent at starting projects, though they may sometimes struggle with follow-through. Independence is crucial to Aries, and they prefer to do things their own way rather than follow others.',
    love: 'In relationships, Aries is passionate, direct, and exciting. They fall in love quickly and aren\'t shy about making the first move. Aries needs a partner who can match their energy and enthusiasm for life. They value honesty and directness in communication and can\'t stand mind games or passive-aggressive behavior. While they can be impulsive in love, their loyalty is unwavering once committed. Aries partners are protective and will fiercely defend their loved ones. They need space for independence and appreciate partners who have their own interests and goals.',
    career: 'Aries thrives in careers that allow them to lead, compete, and take initiative. They excel in entrepreneurship, sales, athletics, military service, emergency response, and any field requiring quick decision-making and courage. Their competitive nature makes them natural winners who push themselves to be the best. Aries needs variety and challenge in their work environment and can become bored with routine tasks. They prefer to be in charge or work independently rather than taking orders from others.',
    money: 'Aries tends to be impulsive with money, often making spontaneous purchases without much planning. They earn well due to their drive and ambition but may struggle with saving. Their competitive nature can lead to overspending on status symbols or experiences. However, their entrepreneurial spirit often leads to multiple income streams. Aries benefits from having a financial advisor or partner who can help balance their impulsive spending with practical financial planning.',
    compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    famousPeople: ['Lady Gaga', 'Robert Downey Jr.', 'Emma Watson', 'Elton John', 'Mariah Carey']
  },
  taurus: {
    name: 'Taurus',
    symbol: '♉',
    dates: 'April 20 - May 20',
    element: 'Earth',
    quality: 'Fixed',
    rulingPlanet: 'Venus',
    color: 'Green',
    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable'],
    weaknesses: ['Stubborn', 'Possessive', 'Uncompromising', 'Materialistic'],
    personality: 'Taurus is an earth sign ruled by Venus, making them the zodiac\'s connoisseurs of comfort and beauty. They have an innate appreciation for the finer things in life and work hard to surround themselves with quality and luxury. Taurus individuals are known for their stability, reliability, and practical approach to life. They move through life at their own steady pace, never rushing but always making consistent progress. Patience is one of their greatest virtues, though it can sometimes manifest as stubbornness. Once a Taurus makes up their mind, it\'s nearly impossible to change it. They value security above all else and will work tirelessly to build a stable foundation in all areas of life.',
    love: 'In love, Taurus is devoted, sensual, and romantic. They take relationships seriously and prefer long-term commitment over casual flings. Physical affection and quality time are essential for Taurus partners. They express love through practical acts of service and creating comfortable environments for their loved ones. Taurus can be possessive and jealous, stemming from their deep need for security in relationships. They need partners who are loyal, stable, and appreciate their nurturing nature. Once committed, Taurus is incredibly faithful and will work through challenges to maintain the relationship.',
    career: 'Taurus excels in careers related to finance, banking, agriculture, art, music, real estate, and any field where they can build something tangible and lasting. They are excellent with money management and have a natural business sense. Their patience and determination make them valuable long-term employees who steadily climb the corporate ladder. Taurus prefers stable work environments with clear structures and good benefits. They need to feel financially secure and will work hard to achieve and maintain that security.',
    money: 'Taurus has excellent money management skills and a natural ability to accumulate wealth. They are savers by nature and enjoy the security that comes with a healthy bank account. While they appreciate luxury, they rarely make impulsive purchases and prefer to invest in quality items that last. Taurus is risk-averse when it comes to finances and prefers traditional, stable investment strategies. Their practical approach to money often leads to long-term financial success.',
    compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    famousPeople: ['Adele', 'Dwayne Johnson', 'David Beckham', 'George Clooney', 'Megan Fox']
  },
  gemini: {
    name: 'Gemini',
    symbol: '♊',
    dates: 'May 21 - June 20',
    element: 'Air',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    color: 'Yellow',
    strengths: ['Adaptable', 'Outgoing', 'Intelligent', 'Communicative', 'Witty', 'Curious'],
    weaknesses: ['Nervous', 'Inconsistent', 'Indecisive', 'Superficial'],
    personality: 'Gemini is an air sign ruled by Mercury, the planet of communication. They are the zodiac\'s social butterflies, known for their quick wit, versatility, and insatiable curiosity. Geminis have active minds that are constantly seeking new information and experiences. They can adapt to any situation and converse with anyone about anything. Their dual nature (represented by the twins) means they can see both sides of every situation, though this can sometimes lead to indecisiveness. Geminis are perpetual students of life, always learning, always questioning. They need mental stimulation and variety to feel fulfilled and can become bored quickly with routine.',
    love: 'In relationships, Gemini needs mental stimulation above all else. They fall in love with someone\'s mind first and need partners who can engage them in interesting conversations and share new ideas. Geminis can be flirtatious and need variety and excitement in their relationships. They fear boredom more than almost anything and need partners who can keep up with their changing interests and moods. Communication is absolutely essential for Gemini in love. They need to talk things through and express their feelings verbally. While they can seem inconsistent, once they find someone who truly captivates their mind, they can be devoted partners.',
    career: 'Gemini excels in careers involving communication, such as journalism, writing, teaching, public relations, sales, and media. Their versatility makes them excellent at multitasking and handling multiple projects simultaneously. They thrive in dynamic work environments where every day brings new challenges. Geminis need variety in their work and can become restless in positions that are too routine. They are natural networkers and often succeed in roles that allow them to connect people and share information.',
    money: 'Gemini\'s relationship with money can be inconsistent. They may earn well due to their versatility and multiple income streams but can also spend impulsively on new interests and experiences. They prefer to spend money on experiences, books, technology, and things that satisfy their curiosity rather than material possessions. Gemini benefits from having a financial plan and sticking to it, though their adaptable nature means they can usually bounce back from financial setbacks.',
    compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo'],
    famousPeople: ['Marilyn Monroe', 'Johnny Depp', 'Angelina Jolie', 'Kanye West', 'Tom Holland']
  },
  cancer: {
    name: 'Cancer',
    symbol: '♋',
    dates: 'June 21 - July 22',
    element: 'Water',
    quality: 'Cardinal',
    rulingPlanet: 'Moon',
    color: 'Silver',
    strengths: ['Tenacious', 'Loyal', 'Emotional', 'Sympathetic', 'Persuasive', 'Intuitive'],
    weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure'],
    personality: 'Cancer is a water sign ruled by the Moon, making them deeply emotional, intuitive, and nurturing. They are the caregivers of the zodiac, with strong protective instincts toward their loved ones. Cancer individuals feel everything deeply and have an almost psychic ability to sense others\' emotions. Their hard outer shell protects a soft, sensitive interior. Home and family are central to Cancer\'s identity and sense of security. They have excellent memories and can hold onto both happy memories and past hurts for years. Cancer people are incredibly loyal once they trust someone, but getting through their defensive barriers can take time.',
    love: 'In love, Cancer is deeply romantic, loyal, and nurturing. They seek emotional security and long-term commitment. Cancer partners are incredibly devoted and will go to great lengths to care for and protect their loved ones. They need partners who can provide emotional stability and reciprocate their depth of feeling. Physical affection and quality time are important to Cancer. They can be clingy when feeling insecure and need constant reassurance of their partner\'s love. Once committed, Cancer is in it for the long haul and expects the same level of commitment in return.',
    career: 'Cancer excels in caring professions such as nursing, counseling, teaching, social work, and hospitality. They also do well in real estate, interior design, culinary arts, and any career where they can create nurturing environments. Their intuitive nature makes them excellent at reading people and situations. Cancer needs to feel emotionally connected to their work and prefers stable, secure employment with good benefits. They are excellent team players who create warm, supportive work environments.',
    money: 'Cancer is generally cautious and conservative with money, preferring to save for security rather than spend impulsively. They view money as a means to create security for themselves and their loved ones. Cancer will invest in their home and family but can be frugal in other areas. Their emotional nature can sometimes lead to comfort spending when feeling stressed or insecure. Overall, Cancer is good at building long-term financial security through steady saving and careful planning.',
    compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    famousPeople: ['Selena Gomez', 'Tom Cruise', 'Ariana Grande', 'Princess Diana', 'Robin Williams']
  },
  leo: {
    name: 'Leo',
    symbol: '♌',
    dates: 'July 23 - August 22',
    element: 'Fire',
    quality: 'Fixed',
    rulingPlanet: 'Sun',
    color: 'Gold',
    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous'],
    weaknesses: ['Arrogant', 'Stubborn', 'Self-centered', 'Inflexible', 'Lazy'],
    personality: 'Leo is a fire sign ruled by the Sun, making them natural-born leaders with magnetic personalities. They radiate warmth, confidence, and charisma wherever they go. Leos have a regal quality about them and often carry themselves with pride and dignity. They are generous, loyal, and protective of their loved ones, much like a lion protecting their pride. Creativity and self-expression are essential to Leo\'s wellbeing. They need to be seen, appreciated, and admired. While this can sometimes come across as attention-seeking, it stems from their genuine desire to bring joy and inspiration to others. Leos have big hearts and love to make grand gestures.',
    love: 'In love, Leo is passionate, romantic, and demonstrative. They love to shower their partners with affection, gifts, and grand romantic gestures. Leos need admiration and appreciation from their partners and will return it tenfold. They are fiercely loyal and protective once committed. Leo partners expect to be treated like royalty but will treat their loved ones the same way. They need partners who can match their intensity and enthusiasm for life. Pride can be an issue for Leo, and they need partners who understand their need for respect and admiration.',
    career: 'Leo excels in careers where they can lead, perform, or be recognized for their talents. They thrive in entertainment, arts, management, politics, and entrepreneurship. Their natural charisma makes them excellent at motivating and inspiring others. Leos need to feel proud of their work and be recognized for their contributions. They prefer leadership positions where they can make decisions and guide others. Creative expression in their career is important for Leo\'s fulfillment.',
    money: 'Leo tends to be generous with money, both with themselves and others. They enjoy luxury and quality and aren\'t afraid to spend on things that make them feel good or look impressive. While they can be prone to overspending, their confidence and drive usually ensure they can earn it back. Leo benefits from budgeting for both necessities and the luxury items they enjoy. Their generosity extends to philanthropy, and they often support causes they believe in.',
    compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    famousPeople: ['Barack Obama', 'Jennifer Lopez', 'Madonna', 'Kylie Jenner', 'Chris Hemsworth']
  },
  virgo: {
    name: 'Virgo',
    symbol: '♍',
    dates: 'August 23 - September 22',
    element: 'Earth',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    color: 'Navy Blue',
    strengths: ['Loyal', 'Analytical', 'Practical', 'Hardworking', 'Reliable'],
    weaknesses: ['Overcritical', 'Perfectionist', 'Worrying', 'Conservative'],
    personality: 'Virgo is an earth sign ruled by Mercury, combining practical earthiness with sharp mental acuity. They are the perfectionists of the zodiac, with keen attention to detail and high standards for themselves and others. Virgos have analytical minds that excel at problem-solving and organizing. They are service-oriented by nature and find fulfillment in helping others and making things better. Virgos are modest despite their many talents and often work behind the scenes. They can be their own harshest critics and struggle with perfectionism. Their practical approach to life combined with their intelligence makes them excellent at managing both the big picture and small details.',
    love: 'In relationships, Virgo shows love through acts of service and practical support. They may not be the most romantically expressive, but they demonstrate devotion through reliability and helpfulness. Virgos need partners who appreciate their attention to detail and understand their need for order. They can be critical, but it comes from a genuine desire to help their partner improve. Virgos are selective about partners and take time to commit, but once they do, they are devoted and faithful. They need intellectual connection and shared values in relationships.',
    career: 'Virgo excels in careers requiring precision, analysis, and organization such as healthcare, editing, accounting, research, quality control, and administration. Their attention to detail and perfectionist tendencies make them invaluable in roles where accuracy is crucial. Virgos are hardworking and reliable employees who take pride in doing excellent work. They need to feel useful and prefer careers where they can make practical improvements. Virgos work well both independently and in support roles.',
    money: 'Virgo is generally financially responsible and careful with money. They budget meticulously and plan for the future. Virgos prefer to save rather than spend impulsively and research purchases carefully before buying. They view money as a tool for security and practical needs rather than luxury. Their analytical nature helps them make smart investment decisions. Virgo rarely faces financial trouble due to their careful planning and conservative approach.',
    compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    famousPeople: ['Beyoncé', 'Keanu Reeves', 'Zendaya', 'Mother Teresa', 'Michael Jackson']
  },
  libra: {
    name: 'Libra',
    symbol: '♎',
    dates: 'September 23 - October 22',
    element: 'Air',
    quality: 'Cardinal',
    rulingPlanet: 'Venus',
    color: 'Pink',
    strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded', 'Social'],
    weaknesses: ['Indecisive', 'Avoids confrontation', 'Self-pitying', 'People-pleasing'],
    personality: 'Libra is an air sign ruled by Venus, making them lovers of beauty, harmony, and balance. They are the diplomats of the zodiac, with natural abilities to see all perspectives and bring people together. Libras have refined tastes and appreciate art, culture, and aesthetic beauty. They are social butterflies who thrive on companionship and partnership. Justice and fairness are core values for Libra, and they can\'t stand inequality or discord. Their desire for balance can make them indecisive as they weigh all options carefully. Libras are charming, gracious, and know how to make others feel comfortable and appreciated.',
    love: 'In love, Libra is romantic, idealistic, and partnership-oriented. They are happiest when in a relationship and put significant effort into making their partnerships work. Libras are attentive partners who enjoy romance, beautiful settings, and meaningful conversations. They need equality and fairness in relationships and will go to great lengths to maintain harmony. Libras can struggle with confrontation and may avoid necessary difficult conversations. They need partners who appreciate beauty, intellectual discussion, and social activities. Once committed, Libra is devoted and works hard to maintain relationship balance.',
    career: 'Libra excels in careers involving aesthetics, diplomacy, law, counseling, human resources, and design. Their ability to see multiple perspectives makes them excellent mediators and negotiators. Libras work well in partnerships and team environments. They need work that involves people and allows them to create beauty or harmony. Libras prefer collaborative work environments where they can bounce ideas off others. Their charm and social skills help them succeed in client-facing roles.',
    money: 'Libra\'s relationship with money reflects their love of beauty and quality. They enjoy spending on art, fashion, home decor, and experiences that bring aesthetic pleasure. While they appreciate nice things, they also value fairness and won\'t overspend to the detriment of others. Libras can be indecisive about financial decisions, weighing options carefully. They benefit from having a financial partner or advisor to help with decision-making. Generally, Libra maintains financial balance through careful consideration.',
    compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    famousPeople: ['Kim Kardashian', 'Will Smith', 'Bruno Mars', 'Serena Williams', 'John Lennon']
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    dates: 'October 23 - November 21',
    element: 'Water',
    quality: 'Fixed',
    rulingPlanet: 'Pluto',
    color: 'Deep Red',
    strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'Loyal', 'Ambitious'],
    weaknesses: ['Jealous', 'Secretive', 'Resentful', 'Controlling', 'Obsessive'],
    personality: 'Scorpio is a water sign ruled by Pluto, making them the most intense and powerful sign of the zodiac. They possess incredible emotional depth and psychological insight. Scorpios are known for their passion, determination, and ability to transform themselves and situations around them. They have magnetic personalities that draw others in, yet they maintain an air of mystery. Scorpios see beyond surface appearances and understand the hidden motivations of people and situations. They are fiercely loyal to those they trust but can be formidable enemies. Nothing is superficial with Scorpio - they approach everything with intensity and commitment.',
    love: 'In love, Scorpio is intensely passionate, loyal, and all-consuming. They don\'t do casual relationships and need deep emotional and physical connection with partners. Scorpios are possessive and jealous, stemming from their intense feelings and fear of betrayal. They need partners who can handle their emotional intensity and desire for deep intimacy. Trust is paramount for Scorpio, and once broken, it\'s nearly impossible to rebuild. They are incredibly devoted partners who will stand by their loved ones through anything. Scorpios need honesty, loyalty, and deep emotional connection in relationships.',
    career: 'Scorpio excels in careers involving research, investigation, psychology, surgery, detective work, and crisis management. Their ability to handle intense situations and uncover hidden truths makes them valuable in challenging fields. Scorpios are ambitious and determined to succeed, often reaching the top of their chosen field. They prefer to work independently or in positions of power. Scorpios need work that feels meaningful and allows them to make significant impact. Their resourcefulness helps them overcome obstacles others might find insurmountable.',
    money: 'Scorpio is strategic and secretive about money. They are good at accumulating wealth through careful planning and strategic investments. Scorpios have strong financial instincts and aren\'t afraid to take calculated risks. They view money as power and security and work hard to achieve financial independence. Scorpios are private about their finances and rarely discuss money matters openly. Their determination and resourcefulness usually ensure financial success.',
    compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    famousPeople: ['Leonardo DiCaprio', 'Katy Perry', 'Drake', 'Ryan Gosling', 'Julia Roberts']
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    dates: 'November 22 - December 21',
    element: 'Fire',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter',
    color: 'Purple',
    strengths: ['Optimistic', 'Freedom-loving', 'Honest', 'Philosophical', 'Adventurous'],
    weaknesses: ['Impatient', 'Tactless', 'Overconfident', 'Irresponsible'],
    personality: 'Sagittarius is a fire sign ruled by Jupiter, making them the zodiac\'s eternal optimists and adventurers. They have an insatiable appetite for knowledge, experience, and freedom. Sagittarians are philosophers and truth-seekers who want to understand the meaning of life. They have jovial, friendly personalities and are natural comedians who can find humor in any situation. Freedom is essential to Sagittarius - they need space to explore, travel, and grow. They are honest to a fault, sometimes lacking tact in their directness. Sagittarians are generous, open-minded, and always ready for the next adventure.',
    love: 'In love, Sagittarius needs freedom, adventure, and intellectual stimulation. They are optimistic and enthusiastic partners who bring fun and excitement to relationships. Sagittarians fear being tied down and need partners who understand their need for independence. They are honest and direct in communication, sometimes brutally so. Sagittarius partners are generous and will encourage their loved ones to pursue their own adventures and growth. They need relationships that expand their horizons and allow room for individual exploration. Once they find a partner who respects their freedom, they are loyal and devoted.',
    career: 'Sagittarius excels in careers involving travel, education, publishing, philosophy, law, and outdoor activities. Their optimistic nature and ability to see the big picture make them excellent leaders and motivators. Sagittarians need variety and freedom in their work and struggle with rigid routines. They are natural teachers and love sharing knowledge with others. Careers that allow them to explore new territories, whether physical or intellectual, are most fulfilling. Sagittarians often have multiple careers throughout their lives.',
    money: 'Sagittarius tends to be optimistic and sometimes careless with money. They prefer to spend on experiences, travel, and education rather than material possessions. Their generous nature can lead to overspending on others. Sagittarians believe money will always come to them and aren\'t typically worried about finances. However, their optimism and luck (Jupiter\'s influence) often ensure they land on their feet. They benefit from having a financial plan and savings strategy to balance their adventurous spending.',
    compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    famousPeople: ['Taylor Swift', 'Brad Pitt', 'Jay-Z', 'Miley Cyrus', 'Walt Disney']
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    dates: 'December 22 - January 19',
    element: 'Earth',
    quality: 'Cardinal',
    rulingPlanet: 'Saturn',
    color: 'Brown',
    strengths: ['Responsible', 'Disciplined', 'Self-controlled', 'Ambitious', 'Patient'],
    weaknesses: ['Pessimistic', 'Stubborn', 'Unforgiving', 'Condescending', 'Workaholic'],
    personality: 'Capricorn is an earth sign ruled by Saturn, making them the zodiac\'s most ambitious and disciplined achievers. They have incredible patience and are willing to work hard for long-term success. Capricorns are practical, responsible, and traditional in their approach to life. They set high standards for themselves and others and have strong self-discipline. Status and achievement matter to Capricorn, who wants to be respected and successful. They may seem serious or reserved, but they have a dry, witty sense of humor. Capricorns are natural leaders who lead by example rather than words. Their determination and persistence help them achieve their ambitious goals.',
    love: 'In love, Capricorn is loyal, committed, and takes relationships seriously. They may be reserved in expressing emotions but show love through actions and commitment. Capricorns take time to open up and prefer serious relationships over casual dating. They need partners who are reliable, ambitious, and share their values. Capricorns can be traditional in their approach to relationships and value stability and security. Once committed, they are incredibly devoted and work hard to maintain the relationship. They need partners who respect their ambitious nature and support their career goals.',
    career: 'Capricorn excels in careers involving business, management, finance, government, administration, and any field where they can climb the ladder of success. Their discipline and ambition make them natural CEOs and executives. Capricorns are willing to start at the bottom and work their way up through hard work and persistence. They need careers with clear hierarchies and advancement opportunities. Status and recognition are important motivators for Capricorn. Their practical approach and organizational skills make them valuable in any professional setting.',
    money: 'Capricorn is financially responsible and conservative. They save diligently and plan carefully for the future. Capricorns view money as a means to security and status. They are willing to delay gratification to achieve long-term financial goals. Their careful planning and discipline usually result in significant wealth accumulation over time. Capricorns prefer traditional, low-risk investments and are skilled at managing resources. They rarely face financial difficulties due to their prudent approach.',
    compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    famousPeople: ['Michelle Obama', 'Denzel Washington', 'Kate Middleton', 'LeBron James', 'Jim Carrey']
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    dates: 'January 20 - February 18',
    element: 'Air',
    quality: 'Fixed',
    rulingPlanet: 'Uranus',
    color: 'Electric Blue',
    strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual'],
    weaknesses: ['Aloof', 'Stubborn', 'Unpredictable', 'Detached', 'Extremist'],
    personality: 'Aquarius is an air sign ruled by Uranus, making them the zodiac\'s revolutionaries and visionaries. They are original thinkers who march to their own beat and value independence above all else. Aquarians are humanitarian by nature and care deeply about making the world a better place. They are intellectual, innovative, and ahead of their time in their thinking. Aquarians can seem detached or aloof because they live so much in their heads. They need freedom to explore ideas and don\'t like being controlled or confined. Aquarians are friendly with everyone but maintain emotional distance even with close friends. Their unique perspective allows them to see solutions others miss.',
    love: 'In love, Aquarius needs friendship, intellectual stimulation, and freedom. They approach relationships with their heads rather than their hearts and need mental connection before emotional connection. Aquarians fear losing their independence in relationships and need partners who give them space. They are loyal and committed but show love in unconventional ways. Aquarians need partners who respect their need for alone time and accept their quirky nature. They are attracted to unique, independent individuals who have their own interests. Traditional romance may not appeal to Aquarius, but they are devoted in their own way.',
    career: 'Aquarius excels in careers involving technology, science, social work, activism, innovation, and any field where they can make progressive change. Their original thinking makes them excellent inventors and problem-solvers. Aquarians need work that allows them to think independently and contribute to society. They prefer flexible work environments that don\'t restrict their creativity. Careers involving teamwork toward humanitarian goals are fulfilling for Aquarius. They often pioneer new fields or bring fresh perspectives to established ones.',
    money: 'Aquarius has an unconventional approach to money. They aren\'t particularly motivated by wealth but want enough to maintain their independence. Aquarians may spend impulsively on technology, causes they believe in, or unique experiences. They prefer to spend money on things that align with their values rather than status symbols. Their innovative thinking can lead to unusual income sources. Aquarius benefits from having a financial plan to ensure their independent lifestyle is sustainable.',
    compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    famousPeople: ['Oprah Winfrey', 'Harry Styles', 'Jennifer Aniston', 'Ed Sheeran', 'Alicia Keys']
  },
  pisces: {
    name: 'Pisces',
    symbol: '♓',
    dates: 'February 19 - March 20',
    element: 'Water',
    quality: 'Mutable',
    rulingPlanet: 'Neptune',
    color: 'Sea Green',
    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
    weaknesses: ['Overly trusting', 'Escapist', 'Idealistic', 'Martyr complex', 'Victim mentality'],
    personality: 'Pisces is a water sign ruled by Neptune, making them the zodiac\'s dreamers and mystics. They are incredibly intuitive, empathetic, and spiritually inclined. Pisces feel everything deeply and can absorb the emotions of those around them. They have rich inner worlds filled with imagination and creativity. Pisces are compassionate to a fault and will sacrifice their own needs to help others. They often struggle with boundaries and can become overwhelmed by the harsh realities of life. Escapism through art, music, or other means is common for Pisces. They see the world through rose-colored glasses and believe in magic and miracles.',
    love: 'In love, Pisces is romantic, devoted, and seeks spiritual connection. They are generous partners who love unconditionally and often idealize their partners. Pisces needs emotional intimacy and deep understanding. They are incredibly supportive and will stand by their partners through anything. Their empathetic nature makes them excellent at meeting their partner\'s emotional needs. However, Pisces can lose themselves in relationships and need partners who help them maintain boundaries. They need partners who appreciate their sensitive nature and don\'t take advantage of their giving spirit.',
    career: 'Pisces excels in careers involving arts, music, healing, spirituality, psychology, and charity work. Their creativity and empathy make them natural artists and healers. Pisces needs work that feels meaningful and allows them to help others or express their creativity. They struggle in harsh, competitive environments and need supportive workplace atmospheres. Careers that allow them to use their intuition and imagination are most fulfilling. Pisces often works in behind-the-scenes roles where they can make a difference without seeking recognition.',
    money: 'Pisces has a complicated relationship with money. They aren\'t particularly motivated by wealth and often give money away to help others. Their idealistic nature can make them impractical about finances. Pisces may struggle with budgeting and can be taken advantage of financially. They prefer to spend money on artistic pursuits, spiritual practices, or helping those in need. Pisces benefits from having a trusted advisor or partner to help manage finances practically while allowing them to maintain their generous spirit.',
    compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    famousPeople: ['Rihanna', 'Justin Bieber', 'Steve Jobs', 'Drew Barrymore', 'Albert Einstein']
  }
};

export function ZodiacSignPage() {
  const { sign } = useParams<{ sign: string }>();
  const navigate = useNavigate();

  const signData = sign ? zodiacData[sign.toLowerCase()] : null;

  if (!signData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Sign not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">CelestiZen</span>
            </button>
            <button
              onClick={() => navigate('/chart/new')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Get Your Chart
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-amber-600/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-purple-400/30 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="text-8xl">{signData.symbol}</div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold text-white mb-2">{signData.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-purple-300 mb-4">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">{signData.dates}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-white/80">
                <div>
                  <span className="text-white/60">Element:</span> {signData.element}
                </div>
                <div>
                  <span className="text-white/60">Quality:</span> {signData.quality}
                </div>
                <div>
                  <span className="text-white/60">Ruling Planet:</span> {signData.rulingPlanet}
                </div>
                <div>
                  <span className="text-white/60">Color:</span> {signData.color}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/20 rounded-xl p-6 border border-green-400/30">
              <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Strengths
              </h3>
              <ul className="space-y-2 text-white/80">
                {signData.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-500/20 rounded-xl p-6 border border-red-400/30">
              <h3 className="text-xl font-bold text-red-400 mb-3">Weaknesses</h3>
              <ul className="space-y-2 text-white/80">
                {signData.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-red-400">•</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              Personality
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">{signData.personality}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-400" />
              Love & Relationships
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">{signData.love}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-amber-400" />
              Career & Work
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">{signData.career}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              Money & Finance
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">{signData.money}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Best Compatibility</h2>
              <div className="flex flex-wrap gap-3">
                {signData.compatibility.map((compatSign, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(`/signs/${compatSign.toLowerCase()}`)}
                    className="px-4 py-2 bg-purple-600/30 rounded-lg text-white hover:bg-purple-600/50 transition-all"
                  >
                    {compatSign}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Famous {signData.name}</h2>
              <ul className="space-y-2 text-white/80">
                {signData.famousPeople.map((person, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-purple-400">★</span>
                    {person}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-12 border-2 border-purple-400/50">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want Your Complete Birth Chart?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a detailed analysis of all your planetary placements for just $1.02
          </p>
          <button
            onClick={() => navigate('/chart/new')}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl"
          >
            Create Your Chart Now
          </button>
        </div>
      </div>
    </div>
  );
}
