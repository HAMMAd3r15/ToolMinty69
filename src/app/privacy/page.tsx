import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | ToolMinty',
    description: 'Privacy Policy for ToolMinty — online calculators and digital tools.',
    alternates: {
        canonical: '/privacy',
    },
    openGraph: {
        title: 'Privacy Policy - ToolMinty',
        description: 'How we handle your data and privacy at ToolMinty.',
        url: 'https://toolminty.com/privacy',
        type: 'website',
    },
};

export default function PrivacyPage() {
    return (
        <article style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Information We Collect</h2>
            <p>
                We do not collect, store, or share any personal information directly from our users.
                All calculations are performed locally on your device or ephemerally in your browser.
            </p>

            <h2>2. Cookies and Web Beacons</h2>
            <p>
                We use cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information that the visitor sends via their browser.
            </p>

            <h2>3. Google AdSense and DoubleClick Cookie</h2>
            <p>
                Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
                Users may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>

            <h2>4. Third-Party Ads</h2>
            <p>
                Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on Age & Date Calculators, which are sent directly to your browser. They automatically receive your IP address when this occurs.
                Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by our site's third-party ad networks to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on the site.
            </p>
            <p>
                Age & Date Calculators has no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2>5. Contact</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at jamespotter.designs@gmail.com.
            </p>
        </article>
    );
}
