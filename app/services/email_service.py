import smtplib
from email.message import EmailMessage


class EmailService:
    def __init__(
        self,
        host: str,
        port: int,
        username: str,
        password: str,
        use_tls: bool,
        sender: str,
    ):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.use_tls = use_tls
        self.sender = sender

    def send_documents(
        self,
        recipient: str,
        customer_name: str,
        period_label: str,
        invoice_url: str,
        upd_url: str,
    ) -> None:
        msg = EmailMessage()
        msg["From"] = self.sender
        msg["To"] = recipient
        msg["Subject"] = f"Счет и УПД за {period_label}"
        msg.set_content(
            f"Здравствуйте.\n\n"
            f"Документы для {customer_name} за {period_label}:\n"
            f"Счет: {invoice_url}\n"
            f"УПД: {upd_url}\n\n"
            f"С уважением,\nБиллинг"
        )

        with smtplib.SMTP(self.host, self.port, timeout=20) as server:
            if self.use_tls:
                server.starttls()
            if self.username:
                server.login(self.username, self.password)
            server.send_message(msg)
