FROM ubuntu:24.04

RUN yes y | unminimize

RUN apt install -y \
  # regular tools
  curl wget git vim neovim \
  # pentest tools
  netcat-traditional \
  nmap \
  socat \
  tcpdump \
  telnet \
  dirb \
  gobuster \
  nikto \
  sqlmap \
  wfuzz \
  hydra \
  john \
  hashcat \
  arp-scan \
  sshpass

COPY metasploit-framework_6.3.56+20240212112607~1rapid7-1_amd64.deb /tmp/metasploit.deb
RUN apt install -y /tmp/metasploit.deb \
  && rm /tmp/metasploit.deb

RUN curl -fsSL -o /usr/local/bin/linpeas https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh \
  && chmod +x /usr/local/bin/linpeas

RUN useradd -m -s /bin/bash attacker
USER attacker
WORKDIR /home/attacker

COPY --chown=attacker:attacker ssh_config .ssh/config
RUN chmod 600 .ssh/config


# keep container running
CMD ["tail", "-f", "/dev/null"]
