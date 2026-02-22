'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const NAMES = {
    Boy: [
        'Ayaan', 'Arham', 'Zayan', 'Rayyan', 'Ahmad', 'Ibrahim', 'Yusuf', 'Zaid', 'Hamza', 'Ali',
        'Saad', 'Bilal', 'Hassan', 'Omar', 'Usman', 'Taha', 'Khalid', 'Sameer', 'Rayan', 'Imran',
        'Faizan', 'Adnan', 'Arsalan', 'Rehan', 'Haroon', 'Daniyal', 'Ammar', 'Talha', 'Huzaifa', 'Mustafa',
        'Abdullah', 'Sufyan', 'Hadi', 'Ilyas', 'Noman', 'Liam', 'Noah', 'James', 'William', 'Benjamin',
        'Lucas', 'Henry', 'Alexander', 'Michael', 'Daniel', 'Matthew', 'Joseph', 'Samuel', 'David', 'Carter',
        'Owen', 'Wyatt', 'John', 'Jack', 'Luke', 'Andrew', 'Nathan', 'Caleb', 'Ryan', 'Isaac',
        'Thomas', 'Ethan', 'Logan', 'Sebastian', 'Levi', 'Julian', 'Hudson', 'Christian', 'Hunter', 'Connor',
        'Aaron', 'Adrian', 'Jonathan', 'Charles', 'Dominic', 'Nicholas', 'Austin', 'Robert', 'Adam', 'Jason',
        'Blake', 'Evan', 'Kevin', 'Cole', 'Jordan', 'Santiago', 'Mateo', 'Diego', 'Leonardo', 'Emiliano',
        'Alejandro', 'Carlos', 'Miguel', 'Angel', 'Fernando', 'Ricardo', 'Eduardo', 'Javier', 'Andres', 'Antonio',
        'Jose', 'Luis', 'Manuel', 'Marco', 'Raul', 'Guillermo', 'Francisco', 'Hector', 'Victor', 'Emmanuel',
        'Rafael', 'Gabriel', 'Brandon', 'Zachary', 'Tyler', 'Jason', 'Brayden', 'Isaiah', 'Anthony', 'Christopher',
        'Joshua', 'Nathaniel', 'Patrick', 'Cameron', 'Miles', 'Dominic', 'Gavin', 'Elias', 'Ezekiel', 'Kai',
        'Roman', 'Xavier', 'Ian', 'Colton', 'Asher', 'Jeremiah', 'Weston', 'Silas', 'Brody', 'Greyson',
        'Jaxon', 'Carson', 'Lincoln', 'Theodore', 'Arthur', 'Rowan', 'Declan', 'Bennett', 'Malik', 'Aqib',
        'Shayan', 'Farhan', 'Zeeshan', 'Adeel', 'Basit', 'Shahzaib', 'Dawood', 'mike', 'Idris', 'Kashif',
        'Muneeb', 'Naveed', 'Qasim', 'Rizwan', 'Salman', 'Shahid', 'Tariq', 'Waleed', 'Yahya', 'Zubair',
        'Ahsan', 'Arif', 'Bashir', 'Fahad', 'Junaid', 'Kareem', 'Latif', 'Majid', 'Naeem', 'Owais',
        'Parvez', 'Rashid', 'Sajid', 'Tariq', 'Umair', 'Yasir', 'Zaki', 'Zarar', 'Aamir', 'Babar',
        'Danish', 'Ehsan', 'Faisal', 'Ghazi', 'Hamid', 'Irfan', 'Jawad', 'Kamran', 'Luqman', 'Mansoor',
        'Nadir', 'Osama', 'Rameez', 'Shariq', 'Talib', 'Uzair', 'Younis', 'Zahid'
    ],
    Girl: [
        'Aisha', 'Fatima', 'Zara', 'Inaya', 'Hania', 'Alina', 'Noor', 'Anaya', 'Layla', 'Ayla',
        'Sara', 'Amira', 'Sofia', 'Areeba', 'Meher', 'Hira', 'Zoya', 'Emaan', 'Aiza', 'Laiba',
        'Maria', 'Rida', 'Kinza', 'Sana', 'Iqra', 'Maryam', 'Khadija', 'Sumayya', 'Zainab', 'Mahnoor',
        'Arwa', 'Hafsa', 'Sidra', 'Bushra', 'Amani', 'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia',
        'Charlotte', 'Amelia', 'Mia', 'Harper', 'Evelyn', 'Abigail', 'Ella', 'Scarlett', 'Grace', 'Chloe',
        'Victoria', 'Riley', 'Aria', 'Lily', 'Avery', 'Zoey', 'Hannah', 'Addison', 'Natalie', 'Brooklyn',
        'Leah', 'Audrey', 'Savannah', 'Bella', 'Claire', 'Skylar', 'Lucy', 'Paisley', 'Everly', 'Anna',
        'Caroline', 'Genesis', 'Kennedy', 'Samantha', 'Allison', 'Madeline', 'Sarah', 'Hailey', 'Autumn', 'Nevaeh',
        'Peyton', 'Serenity', 'Naomi', 'Elena', 'Ariana', 'Camila', 'Valentina', 'Ximena', 'Renata', 'Guadalupe',
        'Daniela', 'Fernanda', 'Lucia', 'Regina', 'Natalia', 'Ana', 'Julieta', 'Andrea', 'Carla', 'Paola',
        'Gabriela', 'Alejandra', 'Mariana', 'Jimena', 'Monserrat', 'Esmeralda', 'Yaretzi', 'Itzel', 'Dulce', 'Adriana',
        'Brisa', 'Citlali', 'Dayana', 'Evelin', 'Fernanda', 'Gloria', 'Ivanna', 'Jacqueline', 'Karen', 'Liliana',
        'Melanie', 'Nadia', 'Paula', 'Rocio', 'Selena', 'Tamara', 'Vanessa', 'Yamileth', 'Zulema', 'Aaliyah',
        'Abeer', 'Adeena', 'Afra', 'Alaya', 'Aleena', 'Alishba', 'Anum', 'Areesha', 'Ayesha', 'Benazir',
        'Dua', 'Farah', 'Fiza', 'Ghazal', 'Hadia', 'Hoorain', 'Iqrah', 'Jannat', 'Kainat', 'Laiba',
        'Mahira', 'Malaika', 'Mehwish', 'Naila', 'Nimra', 'Rabia', 'Rania', 'Ruqayyah', 'Saba', 'Sadia',
        'Safiya', 'Samira', 'Saniya', 'Shanza', 'Sumbul', 'Tabassum', 'Tahira', 'Yumna', 'Zahra', 'Zehra',
        'Zunaira', 'Amber', 'April', 'Ashley', 'Brianna', 'Caitlyn', 'Daisy', 'Delilah', 'Elsa', 'Fiona',
        'Gabriella', 'Heidi', 'Ivy', 'Jasmine', 'Kayla', 'Luna', 'Melody', 'Nicole', 'Olive', 'Penelope',
        'Quinn', 'Rebecca', 'Stella', 'Trinity', 'Uma', 'Valerie', 'Willow', 'Xena', 'Yara', 'Zaria'
    ],
    Neutral: ['Jordan', 'Taylor', 'Casey', 'Riley', 'Skylar', 'Avery', 'Charlie', 'Parker', 'Quinn', 'Rowan']
};

export default function BabyNameGenerator() {
    const [gender, setGender] = useState<keyof typeof NAMES>('Neutral');
    const [result, setResult] = useState<string | null>(null);

    const pickName = () => {
        const list = NAMES[gender];
        setResult(list[Math.floor(Math.random() * list.length)]);
    };

    const faqs = [
        {
            question: "How should I choose a baby name?",
            answer: "Say the name out loud with the last name. Check the initials to make sure they don't spell anything awkward, and consider the name's meaning and origin."
        },
        {
            question: "What are the current trends?",
            answer: "Classic, vintage names are making a huge comeback, along with nature-inspired names and gender-neutral choices."
        },
        {
            question: "Does the meaning matter?",
            answer: "For many parents, the meaning of a name provides a beautiful story or a quality they hope their child will embody. It's a personal choice!"
        }
    ];

    const calc = calculators.find(c => c.href === '/baby-names');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Random Baby Name Generator'}
                description={calc?.description || 'Discover the perfect name for your little one.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        {Object.keys(NAMES).map(g => (
                            <button
                                key={g}
                                onClick={() => setGender(g as any)}
                                className={gender === g ? "btn btn-primary" : "btn-secondary"}
                                style={{ padding: '0.5rem 1.5rem' }}
                            >
                                {g}
                            </button>
                        ))}
                    </div>

                    <div style={{
                        height: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(30, 41, 59, 0.4)',
                        borderRadius: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        {result ? (
                            <div key={result} style={{ animation: 'bounceIn 0.5s cubic-bezier(0.36, 0, 0.66, -0.56) forwards' }}>
                                <div style={{ fontSize: '1rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.2rem', marginBottom: '0.5rem' }}>It's a beautiful name:</div>
                                <div style={{ fontSize: '4rem', fontWeight: 900, color: '#fff' }}>{result}</div>
                            </div>
                        ) : (
                            <div style={{ color: 'var(--color-text-tertiary)' }}>Select a category and click generate!</div>
                        )}
                    </div>

                    <button onClick={pickName} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Generate Name</button>
                </div>
            </div>

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 1; }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                .btn-secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
