interface PlaceholderPageProps {
  title: string;
  description: string;
}

export const PlaceholderPage = ({
  title,
  description,
}: PlaceholderPageProps) => (
  <section className="placeholder-page">
    <p className="placeholder-kicker">Brace</p>
    <h1>{title}</h1>
    <p>{description}</p>
  </section>
);
