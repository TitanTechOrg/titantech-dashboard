import KofiLogo from '@/assets/donations/kofi-badge.webp';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/react';

export function KoFiWidget() {
    return (
        <Link
            isExternal
            href={import.meta.env.VITE_KOFI_DONATIONS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to Ko-fi donation page (opens in a new tab)"
        >
            <Image alt="Ko-fi donation badge" src={KofiLogo} width={300} />
        </Link>
    );
}
