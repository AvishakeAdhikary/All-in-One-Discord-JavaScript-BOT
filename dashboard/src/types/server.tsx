export default interface Server {
    id: string | null;
    banner?: string | null;
    name: string | null;
    icon: string | null;
    owner: boolean;
    permissions: string | null;
    features?: (string | null)[];
}