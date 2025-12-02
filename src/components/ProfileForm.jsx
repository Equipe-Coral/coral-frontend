import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: 700;
  color: #4A2525;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  font-size: 1rem;
  background: #FAF9F8;
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  font-size: 1rem;
  background: #FAF9F8;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #F27D70;
  color: var(--white);
  border: none;
  padding: 1rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  width: 100%;
  transition: background-color 0.2s;
  box-shadow: 0 4px 15px rgba(242, 125, 112, 0.4);
  font-family: var(--font-title);
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #E06C5F;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffe6e6;
  color: #d32f2f;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #ffcccc;
`;

export default function ProfileForm({ onUpdate }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    city: '',
    uf: '',
    address: '',
    number: '',
    avatar_url: '',
    interests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await api.getProfile();
        setForm({
          ...form,
          ...data,
          interests: Array.isArray(data.interests) ? data.interests.join(', ') : '',
        });
      } catch (err) {
        setError('Erro ao carregar perfil.');
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        interests: form.interests.split(',').map(s => s.trim()).filter(Boolean),
      };
      await api.updateProfile(payload);
      if (onUpdate) onUpdate(payload);
    } catch (err) {
      setError('Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Label>Nome</Label>
      <Input name="name" value={form.name} onChange={handleChange} required />
      <Label>E-mail</Label>
      <Input name="email" value={form.email} onChange={handleChange} disabled />
      <Label>Celular</Label>
      <Input name="phone" value={form.phone} onChange={handleChange} />
      <Label>Bio</Label>
      <Textarea name="bio" value={form.bio} onChange={handleChange} rows={3} maxLength={300} />
      <Label>Interesses (separados por vírgula)</Label>
      <Input name="interests" value={form.interests} onChange={handleChange} placeholder="Educação, Meio Ambiente, Mobilidade" />
      <Label>UF</Label>
      <Input name="uf" value={form.uf} onChange={handleChange} maxLength={2} />
      <Label>Cidade</Label>
      <Input name="city" value={form.city} onChange={handleChange} />
      <Label>Endereço</Label>
      <Input name="address" value={form.address} onChange={handleChange} />
      <Label>Número</Label>
      <Input name="number" value={form.number} onChange={handleChange} />
      <Label>Foto de Perfil (URL)</Label>
      <Input name="avatar_url" value={form.avatar_url} onChange={handleChange} placeholder="https://..." />
      <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</Button>
    </FormContainer>
  );
}
