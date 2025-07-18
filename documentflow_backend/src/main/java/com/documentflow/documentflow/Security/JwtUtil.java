package com.documentflow.documentflow.Security;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private final String SECRET = "avadhutmaliwalchandcollegeofengineering32bytesstring";
    private final long EXPIRATION_MS = 1000 * 60 * 60;

    private Key getSignKey(){
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String userName,List<String> roles){
        return Jwts
                .builder()
                .signWith(getSignKey())
                .claim("roles", roles)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_MS))
                .compact();
    }

    public String extractUserName(String token){
        return extractClaim(token,Claims::getSubject);

    }

    public List<String> extractRoles(String token){
        Claims claims = extractAllClaims(token);
        return claims.get("roles",List.class);
    }

    public boolean isTokenValid(String token,String userName){
        return extractUserName(token).equals(userName) && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    private <T> T extractClaim(String token,Function<Claims,T> resolver){
        final Claims claim = extractAllClaims(token);
        return resolver.apply(claim);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
