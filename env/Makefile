.PHONY: attacker
attacker:
# remove old image
	docker rmi penelope-attacker || true
	docker build attacker -t penelope-attacker
