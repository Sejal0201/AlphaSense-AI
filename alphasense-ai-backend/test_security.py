from app.features.auth.security import hash_password, verify_password

password = "AlphaSense123"

hashed = hash_password(password)

print("Hash:", hashed)
print("Verified:", verify_password(password, hashed))