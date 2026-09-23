---
id: MATH-02-04
title: "Integration by Parts and Tabular"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 4
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Antiderivatives_and_Standard_Forms]]", "[[02_Algebraic_Substitution]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Integration by Parts and Tabular

> [!abstract] Scope
> Integrate products using integration by parts, choose u correctly with LIATE, and use the tabular method for repeated cases.

## Core Concept

> [!tip] Intuition
> Integration by parts is the product rule rearranged. It trades one integral for another that is easier, so the whole skill is choosing which factor to differentiate away and which to integrate.

**The formula and where it comes from.** From the product rule $(uv)' = u'v + uv'$, integrate both sides and rearrange:
$$\int u\,dv = uv - \int v\,du$$
The method is not a separate technique so much as the product rule read in the direction that helps. Every application trades $\int u\,dv$ for $\int v\,du$, and success means the new integral is genuinely simpler.

**Choosing u — LIATE.** Take $u$ to be the factor whose derivative simplifies fastest, in this priority order: **L**ogarithmic, **I**nverse trigonometric, **A**lgebraic, **T**rigonometric, **E**xponential. So for $\int x e^x dx$, $u = x$ (algebraic before exponential); for $\int x\ln x\,dx$, $u = \ln x$ (logarithmic first). Getting $u$ right usually decides the problem.

**Why logarithms and inverse trig go first.** None of the other rules can integrate them, so they must be the part that gets differentiated away. Conversely $e^x$ and $\sin x$ reproduce themselves under differentiation and integration, which makes them the natural choice for $dv$.

**Repeated application and the tabular shortcut.** When $u$ is a polynomial of degree $n$, parts must be applied $n$ times, with the polynomial differentiated each round until it becomes zero. The tabular method organises this: list repeated derivatives of $u$ in one column and repeated integrals of $dv$ in the other, then multiply diagonally with alternating $+$, $-$, $+$ signs. It converts a long chain of parts into one table, and it is the standard exam shortcut for $\int x^n e^{ax}dx$, $\int x^n \sin ax\,dx$ and similar.

**The circular case.** Integrals like $\int e^x\sin x\,dx$ do not terminate: applying parts twice returns the original integral. Handle this by naming the original integral $I$, applying parts twice, and solving the resulting equation for $I$. This algebraic closure is the only way to finish, and forgetting to add $+C$ after solving for $I$ is a common slip.

## Derivation

**The formula.** Start from the product rule: $\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}$. Integrate both sides with respect to $x$:

$$uv = \int u\,dv + \int v\,du,$$

using $\int \frac{d}{dx}(uv)\,dx = uv$. Rearranging gives $\int u\,dv = uv - \int v\,du$. Each term is an antiderivative up to a constant, so the indefinite form carries a single $+C$, conventionally attached at the end.

**Why the tabular signs alternate, and when the table terminates.** If $u$ is a polynomial, its derivatives eventually reach zero after finitely many steps. Summing the diagonal products with alternating signs is exactly the repeated parts expansion written compactly: the $k$-th diagonal term is $(-1)^{k}u^{(k)}v^{(-k)}$, which is the accumulated result of applying the formula $n$ times. The table is a bookkeeping device, not a new rule, which is why it is valid only when the derivative column genuinely terminates.

**Why the circular case closes.** For $I = \int e^{ax}\sin bx\,dx$, applying parts twice gives $I = (\mathrm{boundary\ terms}) - k^2 I$ for a constant $k$ depending on $a$ and $b$. Since $I$ appears on both sides, the equation can be solved algebraically: $I(1+k^2) = \mathrm{boundary\ terms}$. No further integration is needed — the second application was never meant to simplify the integral, only to reproduce it.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Integration by parts | $\int u\,dv = uv - \int v\,du$ | The core formula. Choose u by LIATE, then dv is everything else. |
| Definite form | $\int_a^b u\,dv = \left[uv\right]_a^b - \int_a^b v\,du$ | Apply the limits to the boundary term and to the remaining integral. |
| LIATE priority | $\mathrm{Log} > \mathrm{InvTrig} > \mathrm{Alg} > \mathrm{Trig} > \mathrm{Exp}$ | Leftmost factor becomes u. |
| Tabular sign pattern | $+,\,-,\,+,\,-,\,\ldots$ | Multiply diagonally down-right with alternating signs. |
| Tabular, polynomial times exponential | $\int x^2e^x\,dx = x^2e^x - 2xe^x + 2e^x + C$ | Terminates because the derivative column reaches zero. |
| Logarithm alone | $\int \ln x\,dx = x\ln x - x + C$ | Take u = ln x with dv = dx. Worth memorising. |
| Inverse trig alone | $\int \arctan x\,dx = x\arctan x - \tfrac{1}{2}\ln(1+x^2) + C$ | Take u = arctan x with dv = dx. |
| Circular closure | $I = \int e^{ax}\sin bx\,dx \Rightarrow I = \frac{e^{ax}(a\sin bx - b\cos bx)}{a^2+b^2} + C$ | Apply parts twice and solve for I. |
| Reduction structure | $\int x^ne^{x}dx = x^ne^x - n\int x^{n-1}e^x\,dx$ | The recursive pattern the tabular method encodes. |

## Worked Problems

### P1. Evaluate $\displaystyle\int x e^{x}\,dx$.

**Given:** algebraic times exponential

**Solution:**

1. LIATE: algebraic before exponential, so u = x and dv = e^x dx
2. Then du = dx and v = e^x
3. Apply: ∫x e^x dx = x e^x - ∫e^x dx
4. = x e^x - e^x

> [!success]- Answer
> **$xe^x - e^x + C = e^x(x-1) + C$**

> [!warning] Trap
> Choosing u = e^x, which returns an integral no simpler than the original. LIATE exists to prevent this.

### P2. Evaluate $\displaystyle\int x\ln x\,dx$.

**Given:** algebraic times logarithmic

**Solution:**

1. LIATE: logarithmic before algebraic, so u = ln x and dv = x dx
2. Then du = dx/x and v = x^2/2
3. Apply: (x^2/2)ln x - ∫(x^2/2)(1/x)dx
4. = (x^2/2)ln x - (1/2)∫x dx
5. = (x^2/2)ln x - x^2/4

> [!success]- Answer
> **$\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4} + C$**

> [!warning] Trap
> Choosing u = x. The logarithm cannot be integrated by any other rule, so it must be the part that gets differentiated.

### P3. Evaluate $\displaystyle\int x^2 \sin x\,dx$ using the tabular method.

**Given:** polynomial times sine; derivative column terminates

**Solution:**

1. Set up a table with derivatives of u = x^2 and integrals of dv = sin x dx
2. Derivatives: x^2, 2x, 2, 0
3. Integrals: -cos x, -sin x, cos x, sin x
4. Multiply diagonally with alternating signs: (x^2)(-cos x) - (2x)(-sin x) + (2)(cos x)
5. = -x^2 cos x + 2x sin x + 2 cos x

> [!success]- Answer
> **$-x^2\cos x + 2x\sin x + 2\cos x + C$**

> [!warning] Trap
> Losing the alternating signs, which produces sign errors on every second term. Also stopping the derivative column before it reaches zero.

### P4. Evaluate $\displaystyle\int \ln x\,dx$.

**Given:** a single factor, no product visible

**Solution:**

1. Write it as a product by taking u = ln x and dv = dx
2. Then du = dx/x and v = x
3. Apply: x ln x - ∫x(1/x)dx = x ln x - ∫dx
4. = x ln x - x

> [!success]- Answer
> **$x\ln x - x + C$**

> [!warning] Trap
> Believing parts requires two visible factors. Supplying dv = dx is legitimate and is the standard method for a lone logarithm.

### P5. Evaluate $\displaystyle\int e^{x}\cos x\,dx$.

**Given:** circular case; apply parts twice

**Solution:**

1. Let I = ∫e^x cos x dx. Take u = cos x, dv = e^x dx
2. I = e^x cos x + ∫e^x sin x dx
3. Apply parts again to ∫e^x sin x dx with u = sin x: = e^x sin x - ∫e^x cos x dx = e^x sin x - I
4. So I = e^x cos x + e^x sin x - I, giving 2I = e^x(cos x + sin x)

> [!success]- Answer
> **$I = \dfrac{e^x(\cos x + \sin x)}{2} + C$**

> [!warning] Trap
> Giving up when the original integral reappears. The reappearance is the mechanism, not a failure. Also forgetting +C after solving for I.

### P6. Evaluate $\displaystyle\int_0^1 x e^{-x}\,dx$.

**Given:** definite integral by parts

**Solution:**

1. u = x, dv = e^{-x}dx, so du = dx and v = -e^{-x}
2. ∫x e^{-x}dx = -x e^{-x} + ∫e^{-x}dx = -x e^{-x} - e^{-x}
3. Apply limits: [-x e^{-x} - e^{-x}]_0^1
4. At x=1: -e^{-1} - e^{-1} = -2/e; at x=0: 0 - 1 = -1
5. Result: -2/e - (-1) = 1 - 2/e

> [!success]- Answer
> **$1 - \dfrac{2}{e}$**

> [!warning] Trap
> Losing the negative sign in v = -e^{-x}, which flips the sign of the entire answer.

### P7. Evaluate $\displaystyle\int x \arctan x\,dx$.

**Given:** algebraic times inverse trig

**Solution:**

1. LIATE: inverse trig before algebraic, so u = arctan x and dv = x dx
2. du = dx/(1+x^2), v = x^2/2
3. = (x^2/2)arctan x - (1/2)∫x^2/(1+x^2) dx
4. Simplify the remaining integrand: x^2/(1+x^2) = 1 - 1/(1+x^2)
5. So the integral is (1/2)[x - arctan x]
6. Combine: (x^2/2)arctan x - x/2 + (1/2)arctan x

> [!success]- Answer
> **$\dfrac{x^2+1}{2}\arctan x - \dfrac{x}{2} + C$**

> [!warning] Trap
> Not simplifying x^2/(1+x^2) by algebraic division, which leaves an integral that looks unmanageable.

### P8. Evaluate $\displaystyle\int x^3 e^{2x}\,dx$ using the tabular method.

**Given:** cubic times exponential

**Solution:**

1. Derivatives of x^3: 3x^2, 6x, 6, 0
2. Integrals of e^{2x}: e^{2x}/2, e^{2x}/4, e^{2x}/8, e^{2x}/16
3. Multiply with alternating signs: +x^3(e^{2x}/2) - 3x^2(e^{2x}/4) + 6x(e^{2x}/8) - 6(e^{2x}/16)
4. Simplify

> [!success]- Answer
> **$e^{2x}\left(\dfrac{x^3}{2} - \dfrac{3x^2}{4} + \dfrac{3x}{4} - \dfrac{3}{8}\right) + C$**

> [!warning] Trap
> Forgetting the successive divisions by 2 in the integral column, which scales every term wrongly.

### P9. Evaluate $\displaystyle\int \sec^3 x\,dx$ using integration by parts.

**Given:** a case that closes algebraically

**Solution:**

1. Write sec^3 x = sec x * sec^2 x and take u = sec x, dv = sec^2 x dx
2. du = sec x tan x dx, v = tan x
3. I = sec x tan x - ∫sec x tan^2 x dx
4. Use tan^2 = sec^2 - 1: = sec x tan x - ∫sec^3 x dx + ∫sec x dx
5. So I = sec x tan x - I + ln|sec x + tan x|
6. 2I = sec x tan x + ln|sec x + tan x|

> [!success]- Answer
> **$\dfrac{1}{2}\left(\sec x\tan x + \ln|\sec x + \tan x|\right) + C$**

> [!warning] Trap
> Not recognising that I reappears, or using tan^2 = 1 - sec^2 with the wrong sign. The Pythagorean identity must be written as tan^2 = sec^2 - 1.

### P10. Find a reduction formula for $\displaystyle I_n = \int x^n e^{x}\,dx$.

**Given:** derive a recursive relation

**Solution:**

1. Take u = x^n, dv = e^x dx, so du = n x^{n-1}dx and v = e^x
2. I_n = x^n e^x - n∫x^{n-1}e^x dx
3. Recognise the integral as I_{n-1}

> [!success]- Answer
> **$I_n = x^ne^x - n\,I_{n-1}$**

> [!warning] Trap
> Forgetting the factor n from du, which produces an incorrect recursion and wrong values at every subsequent order.

## Traps & Exam Notes

- **Wrong choice of $u$.** Choosing the exponential or trigonometric factor as $u$ usually produces a worse integral. Apply LIATE mechanically until the priority is automatic.
- **Sign error in $v$.** Integrating $dv = e^{-x}dx$ gives $v = -e^{-x}$; dropping the minus flips the answer's sign. The boundary term $uv$ inherits it too.
- **Abandoning the circular case.** When the original integral reappears, name it $I$ and solve algebraically. That is the standard completion, not a dead end.
- **Tabular sign pattern.** The signs alternate $+,-,+,-$ down the diagonal. Losing the alternation corrupts every second term.
- **Tabular validity.** The table terminates only when the derivative column reaches zero. For a non-polynomial $u$ (such as $\ln x$) it never does, so the tabular shortcut does not apply.
- **Forgetting to apply limits to both terms** in a definite integral by parts. The boundary term $[uv]_a^b$ and the remaining integral both need the limits.
- **Not simplifying the leftover integral.** Algebraic division, such as $\frac{x^2}{1+x^2} = 1 - \frac{1}{1+x^2}$, often converts an impossible-looking integral into a table entry.
- **Chasing parts when substitution is correct.** If the derivative of a composite is present as a factor, substitution is faster and safer.

## See Also

- [[01_Antiderivatives_and_Standard_Forms]]
- [[02_Algebraic_Substitution]]
- [[05_Trigonometric_Integrals_and_Substitution]]

---

[[03_Definite_Integrals_and_FTC|⬅ 03]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Trigonometric_Integrals_and_Substitution|05 ➡]]
